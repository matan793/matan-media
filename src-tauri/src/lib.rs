use futures::stream::StreamExt;
use mongodb::{
    bson,
    bson::doc,
    options::ClientOptions,
    Client, Collection,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tauri::{Manager, State};

pub struct AppState {
    db_client: Arc<Client>,
}

#[derive(Serialize, Deserialize, Debug)]
struct User {
    #[serde(rename = "_id")]
    id: bson::oid::ObjectId,
    username: String,
    email: String,
    bio: String,
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn get_users(state: State<'_, AppState>) -> Result<Vec<User>, String> {
    let collection: Collection<User> = state.db_client.database("twitter").collection("users");

    let mut cursor = collection.find(doc! {}).await.map_err(|e| e.to_string())?;

    let mut users: Vec<User> = Vec::new();

    while let Some(result) = cursor.next().await {
        match result {
            Ok(doc) => users.push(doc),
            Err(e) => return Err(e.to_string()),
        }
    }

    Ok(users)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup_hook(async |app| {
            let client_options = ClientOptions::parse("mongodb://localhost:27017")
                .await
                .expect("Failed to parse options");

            let client = Client::with_options(client_options)
                .expect("Failed to create MongoDB client");

            app.manage(AppState {
                db_client: Arc::new(client),
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, get_users])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

