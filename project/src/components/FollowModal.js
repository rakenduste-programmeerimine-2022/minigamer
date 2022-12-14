import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Modal,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";

function FollowModal() {
  // const [followers, setFollowers] = useState([]);
  //const [following, setFollowing] = useState([]);
  let followers = [];
  let following = [];

  const [open, setOpen] = useState({ windowOpen: false, window: "" });
  const [userFollowed, setUserFollowed] = useState(false);
  const handleClose = () => {
    setOpen({ windowOpen: false, window: "" });
  };
  const sessionUser = sessionStorage.getItem("user");

  const navigate = useNavigate();

  if (!sessionUser) {
    throw new Error("Not logged in.");
  }
  const { username } = useParams();
  const { token } = JSON.parse(sessionUser);
  const user = JSON.parse(sessionUser).username;

  const { isLoading, error, data, refetch } = useQuery(
    ["Profile", username],
    async () => {
      const res = await axios.get(
        `../.netlify/functions/server/user/profile/${username}`
      );
      //setFollowers(res.data.object.followers);
      //setFollowing(res.data.object.following);
      setUserFollowed(res.data.object.followers.includes(user));
      return res.data.object;
    }
  );

  if (error) {
    return <ErrorPage from={"profile"} />;
  }
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ margin: 2 }}>Searching for user ... </Typography>
        <CircularProgress />
      </Box>
    );
  }
  if (data && !isLoading) {
    followers = data.followers;
    following = data.following;
  }
  console.log(followers);
  console.log(following);
  console.log(data);

  const HandlefollowUser = async (e) => {
    const FollowURL = "../.netlify/functions/server/follow";
    if (userFollowed) {
      console.log(userFollowed);
      axios
        .delete(FollowURL, {
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: {
            follower: user,
            followee: username,
          },
        })
        .then((res) => {
          setUserFollowed(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(userFollowed);
      axios
        .post(
          FollowURL,
          { follower: user, followee: username },
          {
            headers: {
              Content: "application/json",
              authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          setUserFollowed(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function getFollowers() {
    refetch();
    setOpen({ windowOpen: true, window: "Followers" });
  }

  function getFollowing() {
    refetch();
    setOpen({ windowOpen: true, window: "Following" });
  }

  return (
    <>
      <Box className="userSection">
        <Typography className="user">{username} profile</Typography>
        {username !== user && (
          <Button className="btn" onClick={HandlefollowUser}>
            {userFollowed ? "unfollow user" : "Follow user"}
          </Button>
        )}
      </Box>
      <Box className="divider"></Box>
      <Modal
        open={open.windowOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="popup">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {open.window}
          </Typography>
          {data ? (
            open.window === "Followers" ? (
              followers.length !== 0 ? (
                <>
                  {followers.map((follower) => {
                    return (
                      <Link
                        to={`/profile/${follower}`}
                        onClick={handleClose}
                        key={follower}
                        className="modalLink"
                      >
                        <Typography onClick={refetch}>
                          {" "}
                          {follower !== user ? follower : "YOU"}
                        </Typography>
                      </Link>
                    );
                  })}
                </>
              ) : (
                <Typography>no followers</Typography>
              )
            ) : following.length !== 0 ? (
              <>
                {following.map((followee) => {
                  return (
                    <Link
                      onClick={handleClose}
                      to={`/profile/${followee}`}
                      key={followee}
                      className="modalLink"
                    >
                      <Typography>
                        {followee !== user ? followee : "YOU"}
                      </Typography>
                    </Link>
                  );
                })}
              </>
            ) : (
              <Typography>not following anyone</Typography>
            )
          ) : (
            <>
              <Skeleton animation="wave"></Skeleton>
              <Skeleton animation="wave"></Skeleton>
              <Skeleton animation="wave"></Skeleton>
            </>
          )}
        </Box>
      </Modal>
      <Box className="followButtons">
        <Button onClick={() => getFollowers()} className="btn">
          Followers
        </Button>
        <Button onClick={() => getFollowing()} className="btn">
          Following
        </Button>
      </Box>
      <Box className="gameDataSection">
        <Button className="btn" onClick={() => navigate("/leaderboard")}>
          Scores
        </Button>
      </Box>
    </>
  );
}

export default FollowModal;
