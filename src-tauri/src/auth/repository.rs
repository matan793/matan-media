use crate::auth::users::{PublicUser, User};
use anyhow::Result;
use futures::stream::TryStreamExt;
use mongodb::{
    bson::{doc, to_bson, to_document},
    Collection,
};

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
        // Convert User struct into BSON
        // let doc = to_document(&user)?;  // Instead of to_document
        self.collection.insert_one(user).await?; // Convert BSON to Document before inserting
        Ok(())
    }
    pub async fn find_all(&self) -> Result<Vec<PublicUser>, String> {
        let mut cursor = self
            .collection
            .find(doc! {})
            .await
            .map_err(|e| e.to_string())?;
        let mut users = Vec::new();

        while let Some(result) = cursor.try_next().await.map_err(|e| e.to_string())? {
            users.push(PublicUser {
                id: result.id,
                username: result.username,
                profile_picture: result.profile_picture,
                joined_at: result.joined_at,
            });
        }

        Ok(users)
    }
}
