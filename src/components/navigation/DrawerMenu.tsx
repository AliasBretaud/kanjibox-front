"use client";

import {
  Box,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { useTranslations } from "next-intl";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

const Loader = () => (
  <Box width={48} height={48} p="12px" color="white">
    <CircularProgress color="inherit" size={24} />
  </Box>
);

export const DrawerMenu = () => {
  const t = useTranslations("navigation");
  const { user, isLoading } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (isLoading) return <Loader />;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const drawerWidth = 240;

  const links = user
    ? [{ label: t("buttons.logout"), href: "/api/auth/logout" }]
    : [
        { label: t("buttons.login"), href: "/api/auth/login" },
        { label: t("buttons.signup"), href: "/api/auth/signup" },
      ];

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", height: "100%" }}
      className="bg-blue-navy"
      color="white"
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        {t("drawer.title")}
      </Typography>
      <Divider />
      <List>
        {links.map(({ href, label }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText
                primary={
                  <Link style={{ display: "block", width: "100%" }} href={href}>
                    {label}
                  </Link>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <Box
            width="100%"
            height={48}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            <LanguageSelector />
          </Box>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        size="large"
        aria-label="mobile menu"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleDrawerToggle}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </div>
  );
};
