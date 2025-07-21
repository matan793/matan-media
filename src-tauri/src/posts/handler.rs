use tauri::State;
use crate::posts::{posts::Post, repository::PostRepository, service::PostService};
#[tauri::command]
pub async fn get_posts(
    post_service: State<'_, PostService>
) -> Result<Vec<Post>, String> {
    post_service.get_all_posts().await
}