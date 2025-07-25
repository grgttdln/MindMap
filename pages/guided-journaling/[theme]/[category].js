import Head from "next/head";
import Footer from "@/components/layout/footer";
import SupportFooter from "@/components/layout/support_footer";
import { Box, Typography, Container, Button } from "@mui/material";
import { Poppins, Quicksand } from "next/font/google";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/server-props";
import Navbar from "@/components/layout/navbar";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";

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

export async function getServerSideProps(context) {
  const supabase = createClient(context);

  const { data, error } = await supabase.auth.getUser();

  if (error || !data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: data.user,
    },
  };
}

export default function CategoryDetails({ user }) {
  const [username, setUsername] = useState(user.user_metadata.name);
  const [user_UID, setUser_UID] = useState(user.id);
  const router = useRouter();
  const { theme, category } = router.query;
  const [themeData, setThemeData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      if (!theme || !category) return;

      try {
        const response = await fetch(
          `/api/create-journal/category?theme=${theme}&category=${category}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch category data");
        }
        const { theme: themeData, category: selectedCategory } =
          await response.json();
        setThemeData(themeData);
        setCategoryData(selectedCategory || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [theme, category]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!themeData || !categoryData) return <div>Category not found.</div>;

  return (
    <>
      <Head>
        <title>
          MindMap - {themeData.name} - {categoryData.name}
        </title>
        <meta
          name="description"
          content={`Explore the ${categoryData.name} category under the ${themeData.name} theme for guided journaling.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navbar />
        {/* Back Arrow */}
        <Box>
          <Link href={`/guided-journaling/${theme}`} passHref>
            <Button
              startIcon={<ArrowBackIcon />}
              sx={{
                color: "#2D1B6B",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                minWidth: "auto",
                padding: { xs: "1rem 1.5rem", md: "1rem 8rem" },
              }}
            />
          </Link>
        </Box>

        {/* Main Content Container */}
        <Container
          maxWidth={false}
          sx={{
            width: { xs: "95%", sm: "90%", md: "80%" },
            mx: "auto",
            px: { xs: 2, sm: 3, md: 8, lg: 12 },
          }}
        >
          {/* Gradient Header */}
          <Box
            sx={{
              background:
                "linear-gradient(90deg, #e8bdde 0%, #ded3f3 50%, #bfa4e0 100%)",
              borderRadius: "16px",
              maxWidth: "100%",
              width: "100%",
              mb: 2,
              p: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="500"
              className={`${poppins.className}`}
              sx={{
                fontFamily: poppins.style.fontFamily,
                color: "#2D1B6B",
                fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
                mb: 2,
              }}
            >
              {themeData.name}
            </Typography>

            <Typography
              variant="h2"
              component="h1"
              fontWeight="500"
              className={`${poppins.className}`}
              sx={{
                fontFamily: poppins.style.fontFamily,
                color: "#2D1B6B",
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                mb: { xs: 3, md: 5 },
                lineHeight: { xs: 1.2, md: 1.1 },
              }}
            >
              {categoryData.name}
            </Typography>

            <Typography
              variant="body1"
              className={`${quicksand.className}`}
              sx={{
                fontFamily: quicksand.style.fontFamily,
                color: "#2D1B6B",
                fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
                fontWeight: 400,
                lineHeight: 1.4,
              }}
            >
              A simple {themeData.name.toLowerCase()} practice with four guiding
              prompts.
            </Typography>
          </Box>

          {/* Start Writing Button Box */}
          <Button
            component={Box}
            onClick={() =>
              router.push(
                `/guided-journaling/${theme}/${encodeURIComponent(
                  category
                )}/questions`
              )
            }
            sx={{
              backgroundColor: "#F9F8FE",
              borderRadius: "8px",
              maxWidth: "100%",
              width: "100%",
              mb: { xs: 4, md: 6 },
              py: { xs: 1.5, md: 2 },
              px: { xs: 2, md: 3 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textTransform: "none",
              fontFamily: poppins.style.fontFamily,
              fontWeight: 500,
              fontSize: { xs: "1rem", md: "1.1rem" },
              color: "#4E2BBD",
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#F0EEFF",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            Start Writing
          </Button>

          {/* Content Section */}
          <Box sx={{ maxWidth: "100%", width: "100%" }}>
            <Box sx={{ mb: { xs: 4, md: 6 } }}>
              <Typography
                variant="h5"
                component="h3"
                fontWeight="600"
                className={`${poppins.className}`}
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  color: "#2D1B6B",
                  fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.8rem" },
                  mb: { xs: 1.5, md: 2 },
                }}
              >
                About
              </Typography>
              <Typography
                variant="body1"
                className={`${quicksand.className}`}
                sx={{
                  fontFamily: quicksand.style.fontFamily,
                  color: "#2D1B6B",
                  fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
                  fontWeight: 400,
                  mb: 1,
                  lineHeight: { xs: 1.5, md: 1.6 },
                }}
              >
                {categoryData.about}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="h5"
                component="h3"
                fontWeight="600"
                className={`${poppins.className}`}
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  color: "#2D1B6B",
                  fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.8rem" },
                  mb: { xs: 1.5, md: 2 },
                }}
              >
                Useful When
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyleType: "disc",
                  pl: { xs: 3, md: 4 },
                  "& li": {
                    pb: { xs: 0.5, md: 1 },
                  },
                }}
              >
                {categoryData.useful_when.split("\n").map((point, index) => (
                  <Typography
                    key={index}
                    component="li"
                    variant="body1"
                    className={`${quicksand.className}`}
                    sx={{
                      fontFamily: quicksand.style.fontFamily,
                      color: "#2D1B6B",
                      fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
                      fontWeight: 400,
                      lineHeight: { xs: 1.5, md: 1.6 },
                    }}
                  >
                    {point.trim()}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>

        {/* Footer Section */}
        <Box component="footer" sx={{ mt: { xs: 6, md: 10 } }}>
          <SupportFooter />
          <Footer />
        </Box>
      </Box>
    </>
  );
}
