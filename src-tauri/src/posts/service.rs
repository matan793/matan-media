use crate::auth::{users::User, repository::UserRepository};
use argon2::{self, Config};
use anyhow::{Result, anyhow};

pub struct AuthService {
    repo: UserRepository,
}

impl AuthService {
    pub fn new(repo: UserRepository) -> Self {
        Self { repo }
    }

    pub async fn register(&self, username: String, email: String, password: String) -> Result<()> {
        if self.repo.find_by_email(&email).await?.is_some() {
            return Err(anyhow!("User already exists"));
        }

        let password_hash = Self::hash_password(&password)?;
        let user = User {
            id: None,
            username,
            email,
            password_hash,
        };

        self.repo.insert_user(&user).await?;
        Ok(())
    }

    pub async fn login(&self, email: String, password: String) -> Result<User> {
        let user = self.repo.find_by_email(&email).await?
            .ok_or_else(|| anyhow!("User not found"))?;

        if Self::verify_password(&password, &user.password_hash)? {
            Ok(user)
        } else {
            Err(anyhow!("Invalid credentials"))
        }
    }

    fn hash_password(password: &str) -> Result<String> {
        let salt = b"somesalt"; // use a secure random salt in production
        Ok(argon2::hash_encoded(password.as_bytes(), salt, &Config::default())?)
    }

    fn verify_password(password: &str, hash: &str) -> Result<bool> {
        Ok(argon2::verify_encoded(hash, password.as_bytes())?)
    }
}
