use crate::posts::{posts::Post, repository::PostRepository};

use anyhow::{Result, anyhow};

pub struct PostService {
    repo: PostRepository,
}

impl PostService {
    pub fn new(repo: PostRepository) -> Self {
        Self { repo }
    }

    pub async fn get_all_posts(&self) -> Result<Vec<Post>, String> {
        self.repo.find_all().await.map_err(|e| e.to_string())
    }
}
