import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../Styles/Profile.scss";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Modal,
  Skeleton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UserContext } from "../App";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Profile() {
  let navigate = useNavigate();
  const user = useContext(UserContext);
  let Currentusername = null;

  if (user[0]) {
    Currentusername = user[0].username;
  }

  let { username } = useParams();
  let following = ["juss", "suss", "muss", "kuss"];
  let followers = ["juss", "suss", "muss", "kuss"];
  let isDisabled = false;
  function closeAccordions() {
    isDisabled = true;
  }
  function followUser(name) {
    console.log("user followed : ", name);
  }

  const [open, setOpen] = useState({ windowOpen: false, window: "" });
  const handleOpen = (list) => setOpen({ windowOpen: true, window: list });
  const handleClose = () => setOpen({ windowOpen: false, window: "" });
  const [dataLoaded, setDataLoaded] = useState({ window: "", loaded: false });

  const getFollowData = (list) => {
    handleOpen(list);
    setTimeout(() => {
      setDataLoaded({ window: list, loaded: true });
    }, 2500);
  };

  return (
    <Box className="profile" id="profile">
      <Box className="profileWrapper">
        <Box className="userSection">
          <Typography className="user">{username} profile</Typography>
          {username !== Currentusername && (
            <Button className="btn" onClick={() => followUser(username)}>
              Follow user
            </Button>
          )}
        </Box>
        <Box className="divider"></Box>
        <Box className="followPopUpSection">
          <Button onClick={() => getFollowData("Followers")} className="btn">
            Followers
          </Button>
          <Button onClick={() => getFollowData("Following")} className="btn">
            Following
          </Button>
          <Modal
            open={open.windowOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {open.window}
              </Typography>
              {dataLoaded.loaded && dataLoaded.window === open.window ? (
                open.window === "Followers" ? (
                  <>
                    {followers.map((follower) => {
                      return (
                        <Link
                          to={`/profile/${follower}`}
                          onClick={handleClose}
                          key={follower}
                        >
                          <Typography> {follower}</Typography>
                        </Link>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {following.map((followee) => {
                      return (
                        <Link
                          onClick={handleClose}
                          to={`/profile/${followee}`}
                          key={followee}
                        >
                          <Typography>{followee}</Typography>
                        </Link>
                      );
                    })}
                  </>
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

        <Box className="followSection">
          <Box className="following">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Following</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {followers.map((follower) => {
                  return (
                    <Link to={`/profile/${follower}`} key={follower}>
                      <Typography> {follower}</Typography>
                    </Link>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box className="followers">
            <Accordion disabled={isDisabled}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Following</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {following.map((followee) => {
                  return (
                    <Link
                      onClick={() => closeAccordions()}
                      to={`/profile/${followee}`}
                      key={followee}
                    >
                      <Typography>{followee}</Typography>
                    </Link>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
