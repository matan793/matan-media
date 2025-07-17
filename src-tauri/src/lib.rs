pub mod db;
use crate::db::{users::User, posts::Post, posts};
use crate::db::users;
use mongodb::{bson, bson::doc, options::ClientOptions, Client, Collection};
use std::sync::Arc;
use tauri::{Manager, State};

pub struct AppState {
    db_client: Arc<Client>,
}

#[tauri::command]
async fn get_users(state: State<'_, AppState>) -> Result<Vec<User>, String> {
    let collection = state
        .db_client
        .database("twitter")
        .collection::<User>("users");
    users::find_all(collection).await
}

#[tauri::command]
async  fn get_posts(state: State<'_, AppState>) -> Result<Vec<Post>, String> {
    let collection = state
        .db_client
        .database("twitter")
        .collection::<mongodb::bson::Document>("posts");
    posts::find_all(collection).await
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let client = tauri::async_runtime::block_on(async {
                let options = ClientOptions::parse("mongodb://localhost:27017")
                    .await
                    .expect("Failed to parse connection string");
                Client::with_options(options).expect("Failed to create MongoDB client")
            });

            app.manage(AppState {
                db_client: Arc::new(client),
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![get_users, get_posts])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
