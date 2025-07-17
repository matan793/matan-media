use mongodb::bson::DateTime;
use serde::Serializer;

pub fn bson_datetime_to_string<S>(date: &DateTime, serializer: S) -> Result<S::Ok, S::Error>
where
    S: Serializer,
{
    serializer.serialize_str(&date.to_rfc3339_string())
}
