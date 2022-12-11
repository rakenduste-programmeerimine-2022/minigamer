import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../Styles/Profile.scss";
import { Box, Typography, Button, Modal, Skeleton } from "@mui/material";
//import { UserContext } from "../App";
import ErrorPage from "./ErrorPage";
import axios from "axios";

const Profile = () => {
  let navigate = useNavigate();
  const [open, setOpen] = useState({ windowOpen: false, window: "" });
  const [userFollowed, setUserFollowed] = useState(false);
  const handleOpen = (list) => setOpen({ windowOpen: true, window: list });
  const handleClose = () => setOpen({ windowOpen: false, window: "" });
  const sessionUser = sessionStorage.getItem("user");
  if (!sessionUser) {
    throw new Error("Not logged in.");
  }
  const { username } = useParams();
  const { token } = JSON.parse(sessionUser);
  const user = JSON.parse(sessionUser).username;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const followURL = `../.netlify/functions/server/user/profile/${username}`;

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
  }
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

  const getFollowing = () => {
    getFollowData();
    let list = "Following";
    handleOpen(list); //list is either followers or following
  };

  const getFollowers = () => {
    getFollowData();
    let list = "Followers";
    handleOpen(list); //list is either followers or following
  };

  return (
    <Box className="profile" id="profile">
      <Box className="profileWrapper">
        <Box className="userSection">
          <Typography className="user">{username} profile</Typography>
          {username !== user && (
            <Button className="btn" onClick={HandlefollowUser}>
              {!loading && userFollowed ? "unfollow user" : "Follow user"}
            </Button>
          )}
        </Box>
        <Box className="divider"></Box>
        <Box className="followPopUpSection">
          <Button onClick={() => getFollowers()} className="btn">
            Followers
          </Button>
          <Button onClick={() => getFollowing()} className="btn">
            Following
          </Button>
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
                            <Typography>
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
        </Box>
        <Box className="gameDataSection">
          <Button className="btn" onClick={() => navigate("/leaderboard")}>
            Scores
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
