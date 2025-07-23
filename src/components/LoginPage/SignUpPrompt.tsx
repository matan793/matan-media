import { Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const SignUpPrompt: React.FC = () => (
  <Paper
    elevation={1}
    sx={{
      p: 3,
      mt: 2,
      textAlign: 'center',
      border: '1px solid #dbdbdb'
    }}
  >
    <Typography variant="body2">
      Don't have an account?{' '}
      <Link
        to="/register"
      >
        Sign up
      </Link>
    </Typography>
  </Paper>
);

export default SignUpPrompt;