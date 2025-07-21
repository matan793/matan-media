import { Phone, VisibilityOff, Visibility } from "@mui/icons-material";
import { Box, Alert, TextField, InputAdornment, IconButton, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { LoginCredentials } from "../../../utils/types";
import { useLoginForm } from "../../../hooks/useLoginForm";

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false, error }) => {
  const {
    credentials,
    showPassword,
    setShowPassword,
    errors,
    handleChange,
    validateForm
  } = useLoginForm();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      await onSubmit(credentials);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Username, email, or phone number"
        value={credentials.username}
        onChange={handleChange('username')}
        error={!!errors.username}
        helperText={errors.username}
        disabled={isLoading}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: credentials.username.includes('@') ? undefined : (
            <InputAdornment position="start">
              <Phone fontSize="small" color="action" />
            </InputAdornment>
          )
        }}
      />

      <TextField
        fullWidth
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange('password')}
        error={!!errors.password}
        helperText={errors.password}
        disabled={isLoading}
        sx={{ mb: 3 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                disabled={isLoading}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isLoading || !credentials.username || !credentials.password}
        sx={{
          py: 1.5,
          mb: 2,
          background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #d87b2a 0%,#d45a30 25%,#c91e36 50%,#b91a58 75%,#a8137a 100%)'
          }
        }}
      >
        {isLoading ? 'Logging in...' : 'Log in'}
      </Button>

      {/* <Box sx={{ textAlign: 'center' }}>
        <Link
          to={"/forgot-password"}
        //   variant="body2"
        //   sx={{ color: '#00376b', textDecoration: 'none' }}
        >
          Forgot password?
        </Link>
      </Box> */}
    </Box>
  );
};