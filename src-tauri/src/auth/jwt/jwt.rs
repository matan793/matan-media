// use crate::auth::jwt::claims::Claims;
use super::claims::Claims;
use crate::auth::users::User;
use crate::config;
use jsonwebtoken::errors::ErrorKind;
use jsonwebtoken::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};
pub fn createToken(claims: Claims) -> Result<String, String> {
    let header = Header {
        // kid: Some("signing_key".to_owned()),
        alg: Algorithm::HS512,
        ..Default::default()
    };
    let token = match encode(
        &header,
        &claims,
        &EncodingKey::from_secret(config::JWT_SECRET),
    ) {
        Ok(t) => t,
        Err(_) => "error in creating token".into(), // in practice you would return the error
    };

    Ok(token)
}

pub fn validateToken(token: String) -> Result<String, String> {
    let token_data = decode::<Claims>(
        &token,
        &DecodingKey::from_secret("secret".as_ref()),
        &Validation::default(),
    );

    match token_data {
        Ok(data) => Ok(data.claims.sub),
        Err(err) => match *err.kind() {
            ErrorKind::InvalidToken => Err("invalid token shape".into()),
            ErrorKind::ExpiredSignature => Err("expired token".into()),
            _ => Err("unexpected error in jwt validation".into()),
        },
    }
}