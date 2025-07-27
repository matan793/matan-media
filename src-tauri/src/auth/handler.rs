use std::path::PathBuf;

use crate::auth::jwt::claims::Claims;
use crate::auth::jwt::jwt;
use crate::auth::users::PublicUser;
use crate::posts::posts::Post;
use crate::{config, AppState};
use tauri::State;
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
    let  store = tauri_plugin_store::StoreBuilder::new(&app, path).build().unwrap();
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
pub async fn get_user_posts(app_state: State<'_, AppState>) -> Result<Vec<Post>, String>{
    
}