import { useEffect, useState } from "react";
import { invoke } from '@tauri-apps/api/core';

type Post = {
    id: number;
    title: string;
    content: string;
};

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
                const result = await invoke<Post[]>("get_posts");
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