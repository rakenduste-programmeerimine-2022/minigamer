import React from "react";
import "../Styles/Profile.scss";
import { Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FollowModal from "../components/FollowModal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      staleTime: 1000,
    },
  },
});

const Profile = () => {
  
  return (
    <QueryClientProvider client={queryClient}>
      <Box className="profile" id="profile">
        <Box className="profileWrapper">
          <FollowModal></FollowModal>
        </Box>
      </Box>
    </QueryClientProvider>
  );
};

export default Profile;
