import { useState, useCallback } from 'react';
import { API_BASE_URL } from '../utils/api.js';

export function useGeneratedPrompt() {
    const [generatedPrompt, setGeneratedPrompt] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetchGeneratedPrompt = useCallback(async (prompt, promptLen) => {
        setLoading(true);
        if (prompt === "") {
            prompt = "make words about how this text is Ai generated, and can be customized by using the prompt option above"
        }
        try {
            const res = await fetch(`${API_BASE_URL}/api/practice/getGeneratedPrompt?prompt=${prompt}&promptLen=${promptLen}`, {
                method: 'GET',       
            });
            if (!res.ok) {
                console.error("Failed to get generated prompt: ", res.text);
                return;
            }
            const data = await res.json();
            setGeneratedPrompt(data.output);
            console.log(data.output);
        } catch (err) {
            console.error("Failed to get generated prompt: ", err);
        } finally {
            setLoading(false);
        }
    }, []);

    return { generatedPrompt, loading, fetchGeneratedPrompt }
}