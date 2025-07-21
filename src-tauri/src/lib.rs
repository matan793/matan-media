// pub mod db;
// use crate::db::{users::User, posts::Post, posts};
// use crate::db::users;
use mongodb::{bson::{self, doc}, options::ClientOptions, Client, Collection, Database};
use std::sync::Arc;
use tauri::{Manager, State};



// #[tauri::command]
// async fn get_users(state: State<'_, AppState>) -> Result<Vec<User>, String> {
//     let collection = state
//         .db_client
//         .database("twitter")
//         .collection::<User>("users");
//     users::find_all(collection).await
// }

// #[tauri::command]
// async  fn get_posts(state: State<'_, AppState>) -> Result<Vec<Post>, String> {
//     let collection = state
//         .db_client
//         .database("twitter")
//         .collection::<mongodb::bson::Document>("posts");
//     posts::find_all(collection).await
// }

// #[cfg_attr(mobile, tauri::mobile_entry_point)]
// pub fn run() {
//     tauri::Builder::default()
//         .setup(|app| {
//             let client = tauri::async_runtime::block_on(async {
//                 let options = ClientOptions::parse("mongodb://localhost:27017")
//                     .await
//                     .expect("Failed to parse connection string");
//                 Client::with_options(options).expect("Failed to create MongoDB client")
//             });

//             app.manage(AppState {
//                 db_client: Arc::new(client),
//             });

//             Ok(())
//         })
//         .invoke_handler(tauri::generate_handler![get_users, get_posts])
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }
mod auth;
mod db;
mod serializers;
mod posts;
pub struct AppState {
    db_client: Arc<Client>,
    database: Arc<Database>,

}
use crate::auth::{handler::{get_all_users, register_user, login_user}, repository::UserRepository, service::AuthService};
use crate::posts::{handler::get_posts, repository::PostRepository, service::PostService, posts::Post};
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub async fn run() {
    print!("test");
    // Make sure to await the DB connection
    let db = db::connect_to_db().await.expect("DB failed");

    let users_collection = db.collection("users");
    let user_repo = UserRepository::new(users_collection);
    let auth_service = AuthService::new(user_repo);

        let posts_collection: Collection<Post> = db.collection("posts");
    let post_repo = PostRepository::new(posts_collection);
    let post_service = PostService::new(post_repo);
    tauri::Builder::default()
        .manage(auth_service)
        .manage(post_service)
        .invoke_handler(tauri::generate_handler![get_all_users, register_user, login_user, get_posts])
        .run(tauri::generate_context!())
        .expect("error while running tauri app");
}
