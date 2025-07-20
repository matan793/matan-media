use futures::stream::TryStreamExt;
use mongodb::{
    bson::{doc, oid::ObjectId, DateTime},
    Collection,
};
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
use serde::{Deserialize, Serialize};
#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    #[serde(rename = "_id")]
    pub id: ObjectId,
    pub username: String,
    pub email: String,
    pub bio: String,
    #[serde(serialize_with = "serializers::bson_datetime_to_string")]
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

