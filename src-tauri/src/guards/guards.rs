
use jsonwebtoken::{decode, DecodingKey, Validation};
use serde::de::DeserializeOwned;

#[derive(Debug, Deserialize)]
pub struct Claims { pub sub: String, pub exp: usize }

pub fn verify_token(secret: &str, token: &str) -> anyhow::Result<Claims> {
  let data = decode::<Claims>(
    token,
    &DecodingKey::from_secret(secret.as_bytes()),
    &Validation::default(),
  )?;
  Ok(data.claims)
}

#[macro_export]
macro_rules! protected {
  // signature: protected!(cmd_name, user_ident, (other args)... -> ReturnType);
  ($name:ident, $user:ident, ( $($arg:ident : $ty:ty),* ), -> $ret:ty) => {
    #[tauri::command]
    async fn $name(
      secret: tauri::State<'_, String>,
      token: String,
      $( $arg: $ty ),*
    ) -> Result<$ret, String> {
      let claims = $crate::guards::verify_token(&secret, &token)
        .map_err(|e| format!("auth failed: {}", e))?;
      let $user = claims.sub;
      inner::$name($user, $( $arg ),*).await
    }
  };
}