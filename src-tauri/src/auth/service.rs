use crate::auth::{
    repository::UserRepository,
    users::{PublicUser, User},
};
use anyhow::{anyhow, Result};
use argon2::{
    self,
    password_hash::{rand_core::OsRng, PasswordHasher, SaltString},
    Argon2, PasswordHash, PasswordVerifier,
};

use mongodb::bson::oid::ObjectId;

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

        let salt = SaltString::generate(&mut OsRng);

        let password_hash = Argon2::default()
            .hash_password(password.as_bytes(), &salt)
            .expect("Unable to hash password.")
            .to_string();
        let date = mongodb::bson::DateTime::now();
        let user = User {
            id: ObjectId::new(),
            username,
            email,
            password: password_hash,
            bio: String::new(),
            joined_at: date,
            profile_picture: String::new(),
        };

        self.repo.insert_user(&user).await?;
        Ok(())
    }

    pub async fn login(&self, email: String, password: String) -> Result<User> {
        // Fetch the user from the database based on the email
        let user = self
            .repo
            .find_by_email(&email)
            .await?
            .ok_or_else(|| anyhow!("User not found"))?;

        // Parse the stored password hash into a PasswordHash
        let parsed_hash = PasswordHash::new(&user.password)
            .map_err(|e| anyhow!("Error parsing password hash: {}", e))?;
        // Verify the password with the stored hash using argon2
        let is_valid = Argon2::default()
            .verify_password(password.as_bytes(), &parsed_hash)
            .is_ok();

        if is_valid {
            // Password is valid, return the user
            Ok(user)
        } else {
            // Invalid credentials
            Err(anyhow!("Invalid credentials"))
        }
    }
    pub async fn get_all_users(&self) -> Result<Vec<PublicUser>, String> {
        self.repo.find_all().await
    }
}
