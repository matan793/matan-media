use tauri::State;
use crate::auth::{service::AuthService, users::User};

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

#[tauri::command]
pub async fn get_all_users(
    auth_service: State<'_, AuthService>
) -> Result<Vec<User>, String> {
    let users = auth_service.get_all_users().await.map_err(|e| e.to_string())?;
    // Ok(users.into_iter().map(|user| user.username).collect())
    Ok(users)
}