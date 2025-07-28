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
        &EncodingKey::from_secret(config::JWT_SECRET.as_ref()),
    ) {
        Ok(t) => t,
        Err(_) => "error in creating token".into(), // in practice you would return the error
    };

    Ok(token)
}

pub fn validateToken(token: String) -> Result<String, String> {
    let token_data = decode::<Claims>(
        &token,
        &DecodingKey::from_secret(config::JWT_SECRET.as_ref()),
        &Validation::new(Algorithm::HS512),
    );

    match token_data {
        Ok(data) => Ok(data.claims.sub),
        Err(err) => match err.kind() {
            ErrorKind::InvalidToken => Err("Invalid token format.".into()),
            ErrorKind::InvalidSignature => Err("Invalid token signature.".into()),
            ErrorKind::InvalidEcdsaKey => Err("Invalid ECDSA key used.".into()),
            ErrorKind::InvalidRsaKey(_) => Err("Invalid RSA key used.".into()),
            ErrorKind::RsaFailedSigning => Err("Failed to sign using RSA.".into()),
            ErrorKind::InvalidAlgorithmName => Err("Invalid algorithm name in token.".into()),
            ErrorKind::InvalidKeyFormat => Err("Invalid key format provided.".into()),
            ErrorKind::MissingRequiredClaim(claim) => Err(format!("Missing required claim: {}", claim)),
            ErrorKind::ExpiredSignature => Err("expired".into()),
            ErrorKind::InvalidIssuer => Err("Invalid issuer in token.".into()),
            ErrorKind::InvalidAudience => Err("Invalid audience in token.".into()),
            ErrorKind::InvalidSubject => Err("Invalid subject in token.".into()),
            ErrorKind::ImmatureSignature => Err("Token is not valid yet (nbf claim in the future).".into()),
            ErrorKind::InvalidAlgorithm => Err("Invalid algorithm in token.".into()),
            ErrorKind::MissingAlgorithm => Err("Missing algorithm in token validation.".into()),
            ErrorKind::Base64(_) => Err("Invalid base64 encoding in token.".into()),
            ErrorKind::Json(_) => Err("Invalid JSON in token.".into()),
            ErrorKind::Utf8(_) => Err("Token contains invalid UTF-8 characters.".into()),
            ErrorKind::Crypto(_) => Err("Cryptographic error validating token.".into()),
            _ => Err("sum else.".into())
        }
    }
}