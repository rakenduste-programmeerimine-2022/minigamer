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
  //const [data, setData] = useState(null);
  //const [error, setError] = useState(null);

  //OLD
  /* 
  const getFollowData = async () => {
    setLoading(true);
    axios
      .get(followURL)
      .then((res) => {
        setData(res.data);
        setFollowing(res.data.object.following);
        setFollowers(res.data.object.followers);
        setUserFollowed(res.data.object.followers.includes(user));
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getFollowData();
  }, [followURL]);

  if (error) {
    return <ErrorPage from={"profile"} />;
  } */
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
