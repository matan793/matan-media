import { Box, Typography } from "@mui/material";

const Logo: React.FC = () => (
  <Box sx={{ textAlign: 'center', mb: 4 }}>
    <Typography
      variant="h3"
      sx={{
        fontFamily: "'Lobster Two', cursive",
        background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 'bold'
      }}
    >
      Matan-media
    </Typography>
  </Box>
);

export default Logo;