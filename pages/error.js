import Head from "next/head";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Stack,
  Alert,
} from "@mui/material";
import Image from "next/image";
import { Raleway, Poppins, Quicksand } from "next/font/google";
import ErrorIcon from "@mui/icons-material/Error";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-raleway",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export default function ErrorPage() {
  const router = useRouter();
  const { message } = router.query;

  const errorMessage = message || "Sorry, something went wrong";
  const isExpiredToken = message && message.includes("expired");

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>MindMap - Verification Error</title>
        <meta
          name="description"
          content="There was an issue with email verification. Please try again."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/logo.png" />
      </Head>

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url('/assets/login_bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: "var(--font-poppins), sans-serif",
        }}
        className={`${raleway.variable} ${poppins.variable} ${quicksand.variable}`}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={6}
            sx={{ p: 5, borderRadius: 4, backdropFilter: "blur(10px)" }}
          >
            <Stack spacing={3} alignItems="center">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={2}
              >
                <Image
                  src="/assets/logo.png"
                  alt="Logo"
                  width={70}
                  height={70}
                />
                <Typography
                  variant="h4"
                  fontWeight={500}
                  sx={{
                    color: "#2D1B6B",
                    fontFamily: "var(--font-quicksand)",
                  }}
                >
                  MindMap
                </Typography>
              </Stack>

              <Typography
                variant="body1"
                align="center"
                sx={{ color: "#2D1B6B", fontFamily: "var(--font-quicksand)" }}
              >
                The Journal Where Every Thought Maps Its Purpose
              </Typography>

              <ErrorIcon
                sx={{
                  fontSize: 80,
                  color: "#f44336",
                  my: 2,
                }}
              />

              <Typography
                variant="h5"
                fontWeight={600}
                align="center"
                sx={{
                  color: "#2D1B6B",
                  fontFamily: "var(--font-quicksand)",
                  mb: 1,
                }}
              >
                Verification Failed
              </Typography>

              <Alert
                severity="error"
                sx={{
                  width: "100%",
                  fontFamily: "var(--font-poppins)",
                  "& .MuiAlert-message": {
                    textAlign: "center",
                    width: "100%",
                  },
                }}
              >
                {errorMessage}
              </Alert>

              {isExpiredToken && (
                <Alert
                  severity="info"
                  sx={{
                    width: "100%",
                    fontFamily: "var(--font-poppins)",
                    "& .MuiAlert-message": {
                      textAlign: "center",
                      width: "100%",
                    },
                  }}
                >
                  Confirmation link expired. Please request a new one.
                </Alert>
              )}

              <Stack spacing={2} sx={{ width: "100%", mt: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleRegisterRedirect}
                  sx={{
                    bgcolor: "#4E2BBD",
                    borderRadius: "12px",
                    height: "3.3rem",
                    "&:hover": { bgcolor: "#3d22a3" },
                    fontFamily: "var(--font-poppins)",
                    fontWeight: 600,
                  }}
                >
                  Register Again
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleLoginRedirect}
                  sx={{
                    borderColor: "#2D1B6B",
                    color: "#2D1B6B",
                    borderRadius: "12px",
                    height: "3.3rem",
                    "&:hover": {
                      borderColor: "#1e1474",
                      color: "#1e1474",
                      bgcolor: "rgba(45, 27, 107, 0.04)",
                    },
                    fontFamily: "var(--font-poppins)",
                    fontWeight: 600,
                  }}
                >
                  Go to Login
                </Button>
              </Stack>

              <Typography
                variant="body2"
                align="center"
                sx={{
                  color: "#5F518E",
                  fontFamily: "var(--font-quicksand)",
                  mt: 2,
                }}
              >
                Need help? Contact our support team or try registering with a
                different email address.
              </Typography>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
