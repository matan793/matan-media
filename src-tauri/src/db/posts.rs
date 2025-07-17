use crate::db::users::{PublicUser, User};
// use crate::serializers::bson_datetime_to_string::bson_datetime_to_string;
use futures::{future::ok, TryStreamExt};
use mongodb::{
    bson::{doc, oid::ObjectId, DateTime},
    Collection,
};
use serde::{Deserialize, Serialize};
mod serializers {
    use mongodb::bson::DateTime;
    use serde::Serializer;

    pub fn bson_datetime_to_string<S>(date: &DateTime, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(&date.to_rfc3339_string())
    }
}
#[derive(Serialize, Deserialize)]
pub struct PostComment {
    pub user_id: ObjectId,
    pub content: String,
    #[serde(serialize_with = "serializers::bson_datetime_to_string")]
    pub created_at: DateTime,
    pub user: PublicUser,
}

#[derive(Serialize, Deserialize)]
pub struct Post {
    #[serde(rename = "_id")]
    pub id: ObjectId,
    pub user_id: ObjectId,
    pub content: String,
    pub media: Vec<String>,
    #[serde(serialize_with = "serializers::bson_datetime_to_string")]
    pub created_at: DateTime,
    pub likes_count: u32,
    pub comments: Vec<PostComment>,
    pub user: PublicUser,
}

pub async fn find_all(
    collection: Collection<mongodb::bson::Document>,
) -> Result<Vec<Post>, String> {
    let pipeline: Vec<mongodb::bson::Document> = vec![
        doc! {
            "$lookup": {
                "from": "users",
                "localField": "user_id",
                "foreignField": "_id",
                "as": "user"
            }
        },
        doc! {
            "$unwind": {
                "path": "$user",
            }
        },
        doc! {
            "$lookup": {
                "from": "users",
                "localField": "comments.user_id",
                "foreignField": "_id",
                "as": "comment_users"
            }
        },
        doc! {
            "$addFields": {
                "comments": {
                    "$map": {
                        "input": "$comments",
                        "as": "comment",
                        "in": {
                            "user_id": "$$comment.user_id",
                            "content": "$$comment.content",
                            "created_at": "$$comment.created_at",
                            "user": {
                                "$arrayElemAt": [
                                    {
                                        "$map": {
                                            "input": {
                                                "$filter": {
                                                    "input": "$comment_users",
                                                    "as": "cu",
                                                    "cond": { "$eq": ["$$cu._id", "$$comment.user_id"] }
                                                }
                                            },
                                            "as": "cu",
                                            "in": {
                                                "_id": "$$cu._id",
                                                "username": "$$cu.username",
                                                "profile_picture": "$$cu.profile_picture"
                                            }
                                        }
                                    },
                                    0
                                ]
                            }
                        }
                    }
                }
            }
        },
        doc! {
        "$project": {
          "_id": 1,
          "content": 1,
          "user_id": 1,
          "media": 1,
          "comments": 1,
          "likes_count": 1,
          "created_at": 1,
          "user": {
            "_id": "$user._id",
            "username": "$user.username",
            "profile_picture": "$user.profile_picture",
          }

          }
          },
    ];
    let mut cursor = collection
        .aggregate(pipeline)
        .await
        .map_err(|e| e.to_string())?;
    let mut posts = Vec::new();
    while let Some(doc) = cursor.try_next().await.map_err(|e| e.to_string())? {
        // println!("Document: {:?}", doc);
        let post: Post = mongodb::bson::from_document(doc).map_err(|e| e.to_string())?;
        posts.push(post);
    }
    Ok(posts)
}
