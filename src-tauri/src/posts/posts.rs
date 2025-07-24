use serde::{Deserialize, Serialize};
use mongodb::bson::{doc, oid::ObjectId, DateTime};
use chrono::{DateTime as ChronoDateTime, Utc};
use crate::serializers;
use crate::auth::users::{PublicUser, User};
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
    pub created_at: Option<DateTime>, // זה יהיה BSON DateTime
    pub likes_count: u32,
    pub comments: Vec<PostComment>,
    pub user: PublicUser,
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
    pub created_at: Option<DateTime>, // זה יהיה BSON DateTime
    pub user: PublicUser,
}
