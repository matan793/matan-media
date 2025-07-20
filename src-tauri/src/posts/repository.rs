

use crate::auth::users::User;
use mongodb::{Collection, bson::{doc, to_document}};
use anyhow::Result;

pub struct UserRepository {
    collection: Collection<User>,
}

impl UserRepository {
    pub fn new(collection: Collection<User>) -> Self {
        Self { collection }
    }

    pub async fn find_by_email(&self, email: &str) -> Result<Option<User>> {
        let user = self.collection.find_one(doc! { "email": email }).await?;
        Ok(user)
    }

    pub async fn insert_user(&self, user: &User) -> Result<()> {
        let doc = to_document(user)?;
        self.collection.insert_one_model(doc).await?;
        Ok(())
    }
    pub async fn find_all(&self) -> Result<Vec<User>, String> {
    let mut cursor = self.find(doc! {}).await.map_err(|e| e.to_string())?;
    let mut users = Vec::new();

    while let Some(result) = cursor.try_next().await.map_err(|e| e.to_string())? {
        users.push(result);
    }

    Ok(users)
}
}