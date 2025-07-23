import { Container, Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { LoginCredentials, User } from "../../utils/types";
import SignUpPrompt from "./SignUpPrompt";
import Logo from "./Logo";
import LoginForm from "./LoginForm";
import { invoke } from "@tauri-apps/api/core";

const LoginPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const handleLogin = async (credentials: LoginCredentials) => {
        setIsLoading(true);
        setError('');

        try {

            const username = await invoke<string>('login_user', { ...credentials })

            console.log('Login successful!', username);
        } catch (err) {
            // setError(err instanceof Error ? err.message : 'Login failed');
            setError(err as string);
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '100vh',
                    pt: 8
                }}
            >
                <Paper
                    elevation={1}
                    sx={{
                        width: '100%',
                        maxWidth: 350,
                        p: 4,
                        border: '1px solid #dbdbdb'
                    }}
                >
                    <Logo />
                    <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
                </Paper>

                <SignUpPrompt />
            </Box>
        </Container>
    );
};

export default LoginPage;