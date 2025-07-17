use futures::stream::TryStreamExt;
use mongodb::{
    bson::{doc, oid::ObjectId, DateTime},
    Collection,
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    #[serde(rename = "_id")]
    pub id: ObjectId,
    pub username: String,
    pub email: String,
    pub bio: String,
    joined_at: DateTime,
    profile_picture: String,
    password: String,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct PublicUser {
    #[serde(rename = "_id")]
    pub id: ObjectId,
    pub username: String,
    pub profile_picture: String,
}

pub async fn find_all(collection: Collection<User>) -> Result<Vec<User>, String> {
    let mut cursor = collection.find(doc! {}).await.map_err(|e| e.to_string())?;
    let mut users = Vec::new();

    while let Some(result) = cursor.try_next().await.map_err(|e| e.to_string())? {
        users.push(result);
    }

    Ok(users)
}
