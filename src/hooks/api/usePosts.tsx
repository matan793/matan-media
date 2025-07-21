import { useEffect, useState } from "react";
import { invoke } from '@tauri-apps/api/core';

import { Post } from "../../utils/types"; // Adjust the import path as necessary
export function usePosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPosts() {
            setLoading(true);
            setError(null);
            try {
                // Replace 'get_posts' with your actual Tauri command name
                let result = await invoke<Post[]>("get_posts");
                result = result.map(post => ({
                    ...post,
                    created_at: new Date(post.created_at) // Ensure created_at is a Date object
                }));
                console.log(typeof result[0].created_at, result[0].created_at);
                
                
                setPosts(result);
            } catch (err: any) {
                setError(err.message || "Failed to fetch posts");
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    return { posts, loading, error };
}