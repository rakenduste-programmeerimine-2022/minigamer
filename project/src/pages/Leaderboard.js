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
} from "@mui/material";
import { Container } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Lborad from "../components/Lborad";
import React, { useState } from "react";
import "../Styles/LeaderBoard.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import { isPast, parseISO } from "date-fns";
//import { add, parseISO, formatRFC3339 } from "date-fns";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      staleTime: Infinity,
    },
  },
});

export default function Leaderboard() {
  const [disabelUserSelection, setDisableUserSelection] = useState(false);
  const [disableEvery, setDisableEvery] = useState(false);
  const [disableAll, setDisableAll] = useState(false);
  const dropdownFilters = [
    {
      title: "game",
      options: ["All", "minesweeper", "flood", "nonogram", "Daily"],
    },
    {
      title: "User",
      options: ["You", "Followed", "everyone", "Custom"],
    },
  ];

  const [custom, setCustom] = useState("");
  const [game, setGame] = useState("");
  const [usersearch, setusersearch] = useState("");
  const [date, setDate] = useState("");
  function changeData(e, field) {
    if (field === 0) {
      setGame(e);
      if (e === "Daily") {
        setDisableUserSelection(true);
      } else {
        setDisableUserSelection(false);
      }
      if (e === "") {
        setDisableEvery(true);
      } else {
        setDisableEvery(false);
      }
    } else if (field === 1) {
      setusersearch(e);
      if (e === "everyone") {
        setDisableAll(true);
      } else {
        setDisableAll(false);
      }
    } else if (field === 2) {
      setDate(e);
    }
    let data = [
      {
        game: game,
        date: date,
        usersearch: usersearch,
      },
    ];
    console.log("valikuid muudetud");
    return data;
  }

  function setDateData(e) {
    changeData(e, 2);
  }

  //console.log(game, type, usersearch);
  function changeDatacustom(e) {
    e.preventDefault();
    console.log("valikuid muudetud");
    changeData(custom, 1);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Box className="leaderBoard">
        <Container disableGutters maxWidth="lg" className="container">
          <Box className="filtering">
            <TextField
              className="filter"
              id="date"
              type="date"
              onChange={(e) => setDateData(e.target.value)}
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
                    <Typography key={filter.title + "text"}>
                      {filter.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    key={"accDetails" + index}
                    className="dropdown"
                  >
                    <RadioGroup
                      aria-labelledby={`${filter.title}-radio-group`}
                      name={`${filter.title}-radio-buttons-group`}
                      defaultValue={index === 0 ? "nonogram" : "everyone"}
                      key={"radioGroup" + index}
                    >
                      {filter.options.map((element) => {
                        return element !== "Custom" ? (
                          <FormControlLabel
                            value={element !== "All" ? element : ""}
                            onChange={(e) =>
                              changeData(e.target.attributes.name.value, index)
                            }
                            name={element !== "All" ? element : ""}
                            control={<Radio />}
                            label={element}
                            disabled={
                              (disabelUserSelection && index === 1) ||
                              (disableAll && element === "All") ||
                              (disableEvery && element === "everyone")
                            }
                            key={`${element} ${index}`}
                          />
                        ) : (
                          <FormControlLabel
                            value={element}
                            name={element}
                            control={<Radio />}
                            key={`${element} ${index}`}
                            disabled={disabelUserSelection && index === 1}
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
          <Lborad changeData={changeData} />
        </Container>
      </Box>
    </QueryClientProvider>
  );
}
