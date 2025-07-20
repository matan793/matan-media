use tauri::State;
use crate::auth::service::AuthService;

#[tauri::command]
pub async fn register_user(
    auth_service: State<'_, AuthService>,
    username: String,
    email: String,
    password: String
) -> Result<(), String> {
    auth_service.register(username, email, password).await.map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn login_user(
    auth_service: State<'_, AuthService>,
    email: String,
    password: String
) -> Result<String, String> {
    let user = auth_service.login(email, password).await.map_err(|e| e.to_string())?;
    Ok(user.username) // or token/session ID
}