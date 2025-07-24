use mongodb::bson::DateTime;
use serde::{Deserialize, Deserializer};

pub fn bson_datetime_to_string<S>(date: &Option<DateTime>, serializer: S) -> Result<S::Ok, S::Error>
where
    S: serde::Serializer,
{
    match date {
        Some(d) => serializer.serialize_str(
            &d.try_to_rfc3339_string()
                .map_err(serde::ser::Error::custom)?,
        ),
        None => serializer.serialize_none(), // Serialize `None` as `null`
    }
}
pub fn bson_datetime_from_string<'de, D>(deserializer: D) -> Result<Option<DateTime>, D::Error>
where
    D: Deserializer<'de>,
{
    let s: Option<String> = Option::deserialize(deserializer)?; // Deserialize as Option<String>
    match s {
        Some(date_str) => {
            DateTime::parse_rfc3339_str(&date_str)
                .map(Some)
                .map_err(serde::de::Error::custom)
        }
        None => Ok(None),
    }
}