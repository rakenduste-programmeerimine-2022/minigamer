import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { Container } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import React, { useState } from "react";
import "../Styles/LeaderBoard.scss";
export default function Leaderboard() {
  const dropdownFilters = [
    {
      title: "game",
      options: ["All", "Minesweeper", "Flood", "Nonogram"],
    },
    {
      title: "Type",
      options: ["Default", "Daily"],
    },
    {
      title: "User",
      options: ["You", "Followed", "All", "Custom"],
    },
  ];
  const testscoreData = [
    {
      user: "jajaj",
      game: "minesweeper",
      score: "2",
      challegeType: "daily",
      time: "00:00:20",
    },
    {
      user: "justnii",
      game: "nonogram",
      score: "22232",
      challegeType: "daily",
      time: "22s",
    },
    {
      user: "mhm",
      game: "flood",
      score: "43",
      challegeType: "default",
      time: "5s",
    },
  ];

  const [custom, setCustom] = useState("");
  const [game, setGame] = useState("");
  const [type, setType] = useState("");
  const [usersearch, setusersearch] = useState("");
  function changeData(e, field) {
    if (field === 0) {
      setGame(e);
    } else if (field === 1) {
      setType(e);
    } else {
      setusersearch(e);
    }
    console.log("valikuid muudetud");
  }
  console.log(game, type, usersearch);
  function changeDatacustom(e) {
    e.preventDefault();
    console.log("valikuid muudetud");
    changeData(custom, 2);
  }

  return (
    <Box className="leaderBoard">
      <Container disableGutters maxWidth="lg" className="container">
        <Box className="filtering">
          <TextField
            className="filter"
            id="date"
            type="date"
            defaultValue="2017-05-24"
          />
          {dropdownFilters.map((filter, index) => {
            return (
              <Accordion className="filter" key={filter.title}>
                <AccordionSummary
                  className="accordionTitle"
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id={`panel1a-header-${filter.title} `}
                  key={index}
                >
                  <Typography>{filter.title}</Typography>
                </AccordionSummary>
                <AccordionDetails className="dropdown">
                  <RadioGroup
                    aria-labelledby={`${filter.title}-radio-group`}
                    name={`${filter.title}-radio-buttons-group`}
                    defaultValue=""
                  >
                    {filter.options.map((element) => {
                      return element !== "Custom" ? (
                        <FormControlLabel
                          value={element}
                          onChange={(e) =>
                            changeData(e.target.attributes.name.value, index)
                          }
                          name={element}
                          control={<Radio />}
                          label={element}
                          key={`${element} ${index}`}
                        />
                      ) : (
                        <FormControlLabel
                          value={element}
                          name={element}
                          control={<Radio />}
                          label={
                            <Box
                              component={"form"}
                              autoComplete="off"
                              onSubmit={changeDatacustom}
                              key={"search"}
                            >
                              <TextField
                                id={"Usersearch"}
                                placeholder="search"
                                onChange={(e) => setCustom(e.target.value)}
                              ></TextField>
                            </Box>
                          }
                        ></FormControlLabel>
                      );
                    })}
                  </RadioGroup>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
        <Box className="board">
          <Table className="boardTable">
            <TableBody>
              <TableRow className="titleRow">
                <TableCell>User</TableCell>
                <TableCell>Game</TableCell>
                <TableCell>Challenge Type</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
              {testscoreData.map((data) => {
                return (
                  <TableRow className="dataRow">
                    <TableCell>{data.user}</TableCell>
                    <TableCell>{data.game}</TableCell>
                    <TableCell>{data.challegeType}</TableCell>
                    <TableCell>{data.score}</TableCell>
                    <TableCell>{data.time}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Container>
    </Box>
  );
}
