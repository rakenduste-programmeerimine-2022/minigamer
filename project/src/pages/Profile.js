import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/Profile.scss";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UserContext } from "../App";

function Profile() {
  let navigate = useNavigate();

  const user = useContext(UserContext);
  let Currentusername = null;

  if (user[0]) {
    Currentusername = user[0].username;
    console.log(Currentusername);
  }

  let { username } = useParams();
  let following = ["juss", "suss", "muss", "kuss"];
  let followers = ["juss", "suss", "muss", "kuss"];
  return (
    <Box className="profile" id="profile">
      <Box className="profileWrapper">
        <Typography className="user">{username} profile</Typography>
      </Box>
      <Box className="divider"></Box>
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
                return <Typography key={follower}>{follower}</Typography>;
              })}
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box className="followers">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Following</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {following.map((followee) => {
                return <Typography key={followee}>{followee}</Typography>;
              })}
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
      <Box className="gameDataSection"></Box>
      {Currentusername === username && (
        <Box>
          Seda näeb ainult enda profiilil kui tahame midagi siukest teha
        </Box>
      )}
    </Box>
  );
}

export default Profile;
