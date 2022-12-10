import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../Styles/Profile.scss";
import { Box, Typography, Button, Modal, Skeleton } from "@mui/material";
import { UserContext } from "../App";
import ErrorPage from "./ErrorPage";
import axios from "axios";

function Profile() {
  let navigate = useNavigate();
  const user = useContext(UserContext);
  const [open, setOpen] = useState({ windowOpen: false, window: "" });
  const [dataLoaded, setDataLoaded] = useState({ window: "", loaded: false });
  const [userFollowed, setUserFollowed] = useState(false);
  let { username } = useParams();
  const handleOpen = (list) => setOpen({ windowOpen: true, window: list });
  const handleClose = () => setOpen({ windowOpen: false, window: "" });
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  let userExist = true;
  if (!userExist) {
    return <ErrorPage from={"profile"} />;
  }

  // check if user is signed in
  let USER = null;
  let token = null;
  if (user[0]) {
    USER = user[0].username;
    token = user[0].TOKEN;
  }

  const HandlefollowUser = async (e) => {
    if (userFollowed) {
      const unFollowURL = "../.netlify/functions/server/follow/follow";
      axios
        .delete(unFollowURL, {
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: {
            follower: USER,
            followee: username,
          },
        })
        .then((res) => {
          console.log(res);
          setUserFollowed(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(userFollowed);
      const FollowURL = "../.netlify/functions/server/follow/follow";
      axios
        .post(
          FollowURL,
          { follower: USER, followee: username },
          {
            headers: {
              Content: "application/json",
              authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
          setUserFollowed(true);
          console.log(USER, " ", username);
        })
        .catch((err) => {
          console.log(err);
          console.log(USER, " ", username);
        });
    }
  };

  const getFollowing = () => {
    let list = "Following";
    handleOpen(list); //list is either followers or following
    setDataLoaded({ window: list });
    const followingURL = `../.netlify/functions/server/follow/${username}/following`;
    axios
      .get(followingURL)
      .then((res) => {
        setFollowing(res.data.object.following);
        setDataLoaded({ window: list, loaded: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFollowers = () => {
    let list = "Followers";
    handleOpen(list); //list is either followers or following
    setDataLoaded({ window: list });
    const followersURL = `../.netlify/functions/server/follow/${username}/followers`;
    axios
      .get(followersURL)
      .then((res) => {
        setFollowers(res.data.object.followers);
        setDataLoaded({ window: list, loaded: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box className="profile" id="profile">
      <Box className="profileWrapper">
        <Box className="userSection">
          <Typography className="user">{username} profile</Typography>
          {username !== USER && (
            <Button className="btn" onClick={HandlefollowUser}>
              {userFollowed ? "unfollow user" : "Follow user"}
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
              {dataLoaded.loaded ? (
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
                            <Typography> {follower}</Typography>
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
                          <Typography>{followee}</Typography>
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
}

export default Profile;
