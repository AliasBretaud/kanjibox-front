"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import Link from "next/link";
import ProfileMenu from "./ProfileMenu";

const AuthButtons = () => {
  const { user, isLoading } = useUser();
  if (isLoading) {
    return (
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
  }
  if (!user) {
    return (
      <Stack direction="row" spacing={1}>
        <Link href="/api/auth/login" prefetch={false}>
          <Button variant="outlined" sx={{ color: "white" }}>
            Login
          </Button>
        </Link>
        <Link href="/api/auth/signup" prefetch={false}>
          <Button variant="outlined" sx={{ color: "white" }}>
            Signup
          </Button>
        </Link>
      </Stack>
    );
  }
  return (
    <ProfileMenu
      img={user.picture || undefined}
      name={user.name || undefined}
    />
  );
};

export default AuthButtons;
