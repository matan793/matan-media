import { useEffect, useState } from "react";
import { invoke } from '@tauri-apps/api/core';

import { Post } from "../../utils/types";  
export function usePosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPosts() {
            setLoading(true);
            setError(null);
            try {
                let result = await invoke<Post[]>("get_posts");
                result = result.map(post => ({
                    ...post,
                    created_at: post.created_at
                }));
                console.log(result);
                
                
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