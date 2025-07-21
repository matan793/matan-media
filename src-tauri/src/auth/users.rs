use futures::stream::TryStreamExt;
use mongodb::{
    bson::{doc, oid::ObjectId, DateTime},
    Collection,
};

use crate::serializers;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    #[serde(rename = "_id")]
    pub id: ObjectId,
    pub username: String,
    pub email: String,
    pub bio: String,
    #[serde(
    deserialize_with = "serializers::date_time_to_string::bson_datetime_from_string",
    serialize_with = "serializers::date_time_to_string::bson_datetime_to_string"  // Serialize to string when sending back
)]
    pub joined_at: DateTime,
    pub profile_picture: String,
    pub password: String,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct PublicUser {
    #[serde(rename = "_id")]
    pub id: ObjectId,
    pub username: String,
    pub profile_picture: String,
}
