import {
  AppProvider,
  DashboardLayout,
  PageContainer,
} from "@toolpad/core";
import { extendTheme, Box, Button, useMediaQuery } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import LogoutIcon from "@mui/icons-material/Logout";

import logo1 from "../../../pages/login/img/Group 1116606595 (1).png"
const NAVIGATION = [
  { kind: "header", title: "Main" },
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  { segment: "dashboard/orders", title: "Orders", icon: <ShoppingCartIcon /> },
  { segment: "dashboard/products", title: "Products", icon: <LayersIcon /> },
  { segment: "dashboard/other", title: "Other", icon: <BarChartIcon /> },
  {
    kind: "/",
    title: (
      <Button
        onClick={() => {
          localStorage.removeItem("Admin");
          window.location = "/";
        }}
        startIcon={<LogoutIcon />}
        variant="outlined"
        color="error"
        sx={{
          textTransform: "none",
          borderRadius: 2,
          px: 2,
          fontWeight: 500,
          "&:hover": {
            backgroundColor: "rgba(255,0,0,0.08)",
          },
        }}
      >
        Logout
      </Button>
    ),
    icon: <LogoutIcon color="error" />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: {
          main: "#6366f1",
        },
        background: {
          default: "#f9fafb",
          paper: "#ffffff",
        },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: "#8b5cf6", // Violet
        },
        background: {
          default: "#0f172a",
          paper: "#1e293b",
        },
      },
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: "0.25s ease-in-out",
        },
      },
    },
  },
});

function useDemoRouter() {
  const location = useLocation();
  const navigate = useNavigate();
  return {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate,
  };
}

const Dashbord = () => {
  const navigate = useNavigate();
  const router = useDemoRouter();
  const demoWindow = typeof window !== "undefined" ? window : undefined;

  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    const token = localStorage.getItem("Admin");
    if (!token) navigate("/");
  }, [navigate]);

  return (
    <AppProvider
      branding={{
        logo: (
          <img
            src={logo1}
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              objectFit: "cover",
            }}
          />
        ),
        title: "FastCart Admin",
      }}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      colorScheme={prefersDark ? "dark" : "light"}
    >
      <DashboardLayout>
        <PageContainer>
          <Box
            sx={{
              backdropFilter: "blur(12px)",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              darkMode: {
                backgroundColor: "rgba(30, 41, 59, 0.7)",
              },
              p: 4,
              borderRadius: 4,
              boxShadow: 6,
              transition: "all 0.3s ease",
              minHeight: "80vh",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              animation: "fadein 0.4s ease-in-out",
              "@keyframes fadein": {
                from: { opacity: 0, transform: "translateY(10px)" },
                to: { opacity: 1, transform: "translateY(0px)" },
              },
            }}
          >
            <Outlet />
          </Box>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};

export default Dashbord;
