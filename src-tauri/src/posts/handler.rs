use crate::posts::posts::Post;
use crate::AppState;
use tauri::{App, State};
#[tauri::command]
pub async fn get_posts(app_state: State<'_, AppState>) -> Result<Vec<Post>, String> {
    app_state.post_service.get_all_posts().await
}

#[tauri::command(rename_all = "snake_case")]
pub async fn create_post(
    app_state: State<'_, AppState>,
    post: Post,
    image_paths: Vec<String>,
) -> Result<(), String> {
    print!("Creating post with images: {:?}", post);
    app_state.post_service.create_post(post, image_paths).await
}
