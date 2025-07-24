use crate::config;
use crate::posts::{posts::Post, repository::PostRepository};
use cloudinary::upload::{OptionalParameters, Source, Upload, UploadResult};
use mongodb::bson::oid::ObjectId;
use std::collections::BTreeSet;
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
    pub async fn create_post(&self, post: Post, image_paths: Vec<String>) -> Result<(), String> {
        let mut image_urls: Vec<String> = Vec::new();
        let upload = Upload::new(
            config::CLOUDINARY_API_KEY.to_string(),
            config::CLOUDINARY_CLOUD_NAME.to_string(),
            config::CLOUDINARY_API_SECRET.to_string(),
        );
        for image_path in image_paths {
            let options = BTreeSet::from([OptionalParameters::Folder("matan-media".to_string())]);
            let result = upload
                .image(Source::Path(image_path.into()), &options)
                .await
                .map_err(|e| e.to_string())?;
            match result {
                UploadResult::Response(r) => {
                    image_urls.push(r.secure_url); // Response.secure_url :contentReference[oaicite:0]{index=0}
                }
                UploadResult::ResponseWithImageMetadata(r) => {
                    image_urls.push(r.secure_url); // ResponseWithImageMetadata.secure_url :contentReference[oaicite:1]{index=1}
                }
                UploadResult::Error(e) => {
                    return Err(e.error.message); // e.message is the error message
                }
            }
        }
        let post_with_images = Post {
            media: image_urls.clone(),
            id: Some(ObjectId::new()),
            ..post

        };
        self.repo
            .insert(&post_with_images)
            .await
            .map_err(|e| e.to_string())?;
        Ok(())
    }
}
