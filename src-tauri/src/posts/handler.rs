use tauri::State;
use crate::AppState;
use crate::posts::{posts::Post, repository::PostRepository, service::PostService};
#[tauri::command]
pub async fn get_posts(
    app_state: State<'_, AppState>
) -> Result<Vec<Post>, String> {
    app_state.post_service.get_all_posts().await
}