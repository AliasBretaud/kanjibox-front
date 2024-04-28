"use client";

import type { MouseEvent } from "react";
import { useState } from "react";

import Logout from "@mui/icons-material/Logout";
import { indigo } from "@mui/material/colors";
import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { UserProfile } from "@auth0/nextjs-auth0/client";
import { useUser } from "@auth0/nextjs-auth0/client";

const Loader = () => (
  <Box
    width={42}
    height={42}
    alignItems="center"
    justifyContent="center"
    display="flex"
  >
    <CircularProgress size={32} color="inherit" sx={{ p: "5px" }} />
  </Box>
);

const ProfileButton = ({ user }: { user?: UserProfile }) => {
  const t = useTranslations("navigation");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title="Profile">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "profile-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            sx={{ width: 32, height: 32 }}
            src={user?.picture || undefined}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="profile-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              color: "white",
              backgroundColor: indigo[500],
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: indigo[500],
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Container sx={{ pb: 1 }}>
          <Typography>{user?.name || undefined}</Typography>
        </Container>
        <Divider />
        <Link href="/api/auth/logout">
          <MenuItem onClick={handleClose}>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <ListItemIcon>
                <Logout fontSize="small" sx={{ color: "white" }} />
              </ListItemIcon>
              {t("buttons.logout")}
            </Stack>
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
};

const ProfileMenu = () => {
  const { isLoading, user } = useUser();
  return (
    <div data-testid="profile-menu">
      {isLoading ? <Loader /> : <ProfileButton user={user} />}
    </div>
  );
};

export default ProfileMenu;
