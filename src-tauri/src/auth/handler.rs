use std::path::PathBuf;

use crate::auth::jwt::claims::Claims;
use crate::auth::jwt::jwt;
use crate::auth::users::PublicUser;
use crate::posts::posts::Post;
use crate::{config, AppState};
use serde_json::Value;
use tauri::State;
use tauri_plugin_store::StoreBuilder;
#[tauri::command]
pub async fn register_user(
    app_state: State<'_, AppState>,
    username: String,
    email: String,
    password: String,
) -> Result<String, String> {
    match app_state
        .auth_service
        .register(username, email, password)
        .await
        .map_err(|e| e.to_string())
    {
        Ok(_) => Ok("User registered successfully".to_string()),
        Err(e) => Err(e),
    }
    // Ok("User registered successfully".to_string())
}

#[tauri::command]
pub async fn login_user(
    app: tauri::AppHandle,
    app_state: State<'_, AppState>,
    email: String,
    password: String,
) -> Result<String, String> {
    let user = app_state
        .auth_service
        .login(email, password)
        .await
        .map_err(|e| e.to_string())?;

    let claims = Claims {
        sub: user.id.to_string(),
        exp: config::JWT_EXPIRATION,
    };

    let token = jwt::createToken(claims)?;

    let path = PathBuf::from("settings.json");
    let store = tauri_plugin_store::StoreBuilder::new(&app, path)
        .build()
        .unwrap();
    store.set("auth-token", token.clone());

    Ok(token)
}

#[tauri::command]
pub async fn get_all_users(app_state: State<'_, AppState>) -> Result<Vec<PublicUser>, String> {
    let users = app_state
        .auth_service
        .get_all_users()
        .await
        .map_err(|e| e.to_string())?;
    // Ok(users.into_iter().map(|user| user.username).collect())
    Ok(users)
}

#[tauri::command]
pub async fn get_current_user(
    app: tauri::AppHandle,
    app_state: State<'_, AppState>,
) -> Result<PublicUser, String> {
    // Build the store from the app handle
    let path = PathBuf::from("settings.json");
    let store = tauri_plugin_store::StoreBuilder::new(&app, path)
        .build()
        .unwrap();

    let token_value = store.get("auth-token");
    let token = match token_value {
        Some(Value::String(s)) => s,
        _ => return Err("User not logged in or token missing".to_string()),
    };
    let user_id = jwt::validateToken(token).map_err(|e| e.to_string())?;

    app_state.auth_service.get_user_by_id(user_id).await
}
