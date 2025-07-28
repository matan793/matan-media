use crate::auth::users::{PublicUser, User};
use crate::serializers;
use chrono::{DateTime as ChronoDateTime, Utc};
use mongodb::bson::{doc, oid::ObjectId, DateTime};
use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, Debug)]
pub struct Post {
    #[serde(rename = "_id")]
    pub id: Option<ObjectId>,
    pub user_id: ObjectId,
    pub content: String,
    pub media: Vec<String>,
    #[serde(
        deserialize_with = "serializers::date_time_to_string::bson_datetime_from_string",
        serialize_with = "serializers::date_time_to_string::bson_datetime_to_string"
    )]
    pub created_at: Option<DateTime>,
    pub likes_count: u64,
    pub comments: Vec<PostComment>,

    #[serde(skip_serializing_if = "Option::is_none")]
    pub user: Option<PublicUser>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct PostComment {
    #[serde(rename = "_id")]
    pub id: ObjectId,
    pub user_id: ObjectId,
    pub content: String,
    #[serde(
        deserialize_with = "serializers::date_time_to_string::bson_datetime_from_string",
        serialize_with = "serializers::date_time_to_string::bson_datetime_to_string"
    )]
    pub created_at: Option<DateTime>,

    #[serde(skip_serializing_if = "Option::is_none")]
    pub user: Option<PublicUser>,
}
