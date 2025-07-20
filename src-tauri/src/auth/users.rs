use futures::stream::TryStreamExt;
use mongodb::{
    bson::{doc, oid::ObjectId, DateTime},
    Collection,
};
mod serializers {
    use mongodb::bson::DateTime;
    use serde::{Deserialize, Deserializer, Serialize, Serializer};

    pub fn bson_datetime_to_string<S>(date: &DateTime, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(&date.to_rfc3339_string())
    }
    pub fn bson_datetime_from_string<'de, D>(deserializer: D) -> Result<DateTime, D::Error>
    where
        D: Deserializer<'de>,
    {
        let s: String = Deserialize::deserialize(deserializer)?;
        DateTime::parse_rfc3339_str(&s).map_err(serde::de::Error::custom)
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
    #[serde(
        serialize_with = "serializers::bson_datetime_to_string",
        deserialize_with = "serializers::bson_datetime_from_string"
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
