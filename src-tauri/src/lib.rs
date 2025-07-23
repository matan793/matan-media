use mongodb::{bson::{self, doc}, options::ClientOptions, Client, Collection, Database};
use std::sync::Arc;
use tauri::{Manager, State};
mod auth;
mod db;
mod serializers;
mod posts;
mod errors;

#[derive(Clone)]
pub struct AppState {
    pub auth_service: Arc<auth::service::AuthService>,
    pub post_service: Arc<posts::service::PostService>,

}
use crate::auth::{handler::{get_all_users, register_user, login_user}, repository::UserRepository, service::AuthService};
use crate::posts::{handler::get_posts, repository::PostRepository, service::PostService, posts::Post};

async fn config_app() -> Result<AppState, anyhow::Error> {
   let db = db::connect_to_db().await?;

    let users_collection = db.collection("users");
    let user_repo = UserRepository::new(users_collection);
    let auth_service = AuthService::new(user_repo);

        let posts_collection: Collection<Post> = db.collection("posts");
    let post_repo = PostRepository::new(posts_collection);
    let post_service = PostService::new(post_repo);

    Ok(AppState {
        auth_service: Arc::new(auth_service),
        post_service: Arc::new(post_service),
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub async fn run() {
    let app_state = config_app().await.expect("Failed to configure app state");
    tauri::Builder::default()
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![get_all_users, register_user, login_user, get_posts])
        .run(tauri::generate_context!())
        .expect("error while running tauri app");
}
