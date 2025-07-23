use mongodb::bson::DateTime;
use serde::{Deserialize, Deserializer, Serialize, Serializer};

pub fn bson_datetime_to_string<S>(date: &DateTime, serializer: S) -> Result<S::Ok, S::Error>
where
    S: serde::Serializer,
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
