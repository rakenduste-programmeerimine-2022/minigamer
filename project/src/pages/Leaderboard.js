import {
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { Container } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRadioGroup } from "@mui/material/RadioGroup";

import React from "react";
import "../Styles/LeaderBoard.scss";
export default function Leaderboard(props) {
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
  // if custom selected fire event that opens textfield
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
          {dropdownFilters.map((filter) => {
            return (
              <Accordion className="filter" key={filter.title}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id={`panel1a-header-${filter.title} `}
                  key={"summary" + filter.title}
                >
                  <Typography>{filter.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup
                    aria-labelledby={`${filter.title}-radio-group`}
                    name={`${filter.title}-radio-buttons-group`}
                  >
                    {filter.options.map((element) => {
                      return (
                        <FormControlLabel
                          value={element}
                          control={<Checkbox />}
                          label={element}
                          key={element}
                        />
                      );
                    })}
                  </FormGroup>
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
