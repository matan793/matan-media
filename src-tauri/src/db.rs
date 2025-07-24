use anyhow::Result;
use mongodb::{Client, Database};

pub async fn connect_to_db() -> Result<Database> {
    let client = Client::with_uri_str("mongodb://localhost:27017").await?;
    Ok(client.database("twitter"))
}
