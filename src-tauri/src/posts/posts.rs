use crate::auth::users::PublicUser;
// use crate::serializers::bson_datetime_to_string::bson_datetime_to_string;
use crate::serializers;
use mongodb::bson::{doc, oid::ObjectId, DateTime};
use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, Debug)]
pub struct PostComment {
    pub user_id: ObjectId,
    pub content: String,
    #[serde(
    deserialize_with = "serializers::date_time_to_string::bson_datetime_from_string",
    serialize_with = "serializers::date_time_to_string::bson_datetime_to_string"  // Serialize to string when sending back
)]
    pub created_at: DateTime,
    pub user: PublicUser,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Post {
    #[serde(rename = "_id")]
    pub id: ObjectId,
    pub user_id: ObjectId,
    pub content: String,
    pub media: Vec<String>,
    #[serde(
    deserialize_with = "serializers::date_time_to_string::bson_datetime_from_string",
    serialize_with = "serializers::date_time_to_string::bson_datetime_to_string"  // Serialize to string when sending back
)]
    pub created_at: DateTime,
    pub likes_count: u32,
    pub comments: Vec<PostComment>,
    pub user: PublicUser,
}
