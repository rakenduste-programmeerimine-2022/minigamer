import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Box,
  Button,
  Skeleton,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

const Lborad = ({ changeData }) => {
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [PAGE, setPAGE] = useState(1);
  const [open, setOpen] = useState(false);
  const handleChangePage = (e, newPage) => {
    console.log(newPage);
    setPAGE(newPage + 1);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPAGE(0);
  };

  console.log(PAGE);
  const sessionUser = sessionStorage.getItem("user");
  const { username } = JSON.parse(sessionUser);
  const searchParams = changeData();
  let GAME = searchParams[0].game;
  let DATE = searchParams[0].date;
  let USER = searchParams[0].usersearch;
  let callQuery = searchParams[0].callQuery;
  console.log(callQuery);
  let scores = [];
  console.log(GAME, DATE, USER);
  if (!USER) USER = "everyone";

  let URL = `../.netlify/functions/server/score/g/nonogram/${PAGE}`;
  // search games by date or all dates
  if (GAME && GAME !== "Daily") {
    URL = `../.netlify/functions/server/score/g/${GAME}/${PAGE}`;
    if (DATE) {
      URL = `../.netlify/functions/server/score/g/${GAME}/${PAGE}?date=${DATE}`;
    }
  }
  //first load condition if user decides to change date
  if (DATE && !GAME) {
    GAME = "nonogram";
    URL = `../.netlify/functions/server/score/g/${GAME}/${PAGE}?date=${DATE}`;
  }

  //Daily challenge of set day
  if (GAME === "Daily") {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    console.log(today);
    URL = `../.netlify/functions/server/score/d/${today}/${PAGE}`;
    if (DATE) URL = `../.netlify/functions/server/score/d/${DATE}/${PAGE}`;
  }

  //score by followed users
  if (USER === "Followed" && GAME !== "Daily") {
    let gameaddon = "";
    let dateaddon = "";
    if (GAME) {
      gameaddon = `?game=${GAME}`;
    }
    if (DATE && !GAME) {
      dateaddon = `?date=${DATE}`;
    } else if (DATE && GAME) {
      dateaddon = `&date=${DATE}`;
    }
    URL = `../.netlify/functions/server/score/u/${username}/following/${PAGE}${gameaddon}${dateaddon}`;
  }

  //scores made by user
  if (USER && USER !== "Followed" && USER !== "everyone") {
    let gameaddon = "";
    let dateaddon = "";
    if (USER === "You") USER = username;
    if (GAME) {
      gameaddon = `?game=${GAME}`;
    }
    if (DATE && !GAME) dateaddon = `?date=${DATE}`;
    else if (DATE && GAME) dateaddon = `&date=${DATE}`;
    URL = `../.netlify/functions/server/score/u/${USER}/${PAGE}${gameaddon}${dateaddon}`;
  }

  const { isLoading, isFetching, error, data } = useQuery(
    ["Leaderboards", PAGE, searchParams[0]],
    async () => {
      const res = await axios.get(URL);
      return res.data;
    }
    /* { initialData: "" } */
  );

  useEffect(() => {
    if (error) {
      console.log(error);
      setOpen(true);
    }
    if (data && data.object.scores.length === 0) {
      setPAGE(1);
    }
  }, [error, data]);

  if (data) {
    scores = data.object.scores;
    console.log(data);
    console.log(data.object.scores.length);
  }
  const titleRow = ["Rank", "User", "Game", "Score", "Time"];

  return (
    <>
      <TableContainer className="board">
        <Table className="boardTable">
          <TableBody>
            <TableRow className="titleRow">
              {titleRow.map((title) => {
                return <TableCell key={title}>{title}</TableCell>;
              })}
            </TableRow>
            {data && data.object.scores.length !== 0 ? (
              scores.map((data, index) => {
                return (
                  <TableRow key={index} className="dataRow">
                    <TableCell key={(PAGE - 1) * 25 + index + 1}>
                      {(PAGE - 1) * 25 + index + 1}
                    </TableCell>

                    <TableCell key={data.username + index}>
                      {data.username}
                    </TableCell>
                    <TableCell key={data.gameID + index + "game"}>
                      {USER !== "everyone"
                        ? data.gameID === 0
                          ? "Nonogram"
                          : data.gameID === 1
                          ? "Minesweeper"
                          : data.gameID === 2 && "Flood"
                        : GAME
                        ? GAME
                        : "nonogram"}{" "}
                      {/* nonogram is the default search when nothing is picked */}
                    </TableCell>
                    <TableCell key={data.score}>{data.score}</TableCell>
                    <TableCell key={DATE}>
                      {data.date ? data.date.split("T")[0] : DATE}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <>
                {titleRow.map((title) => {
                  return (
                    <TableRow className="dataRow" key={title}>
                      {titleRow.map((title, index) => {
                        return (
                          <TableCell key={title + index}>No data</TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {data && (
        <TablePagination
          rowsPerPageOptions={[rowsPerPage]}
          component={"div"}
          count={
            data.object.scores.length === rowsPerPage
              ? -1
              : data.object.scores.length + (PAGE - 1) * 25
          }
          rowsPerPage={rowsPerPage}
          page={PAGE - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        ></TablePagination>
      )}

      {error && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          onClose={() => setOpen(false)}
          key={"snackbar"}
        >
          <Alert severity="error">Something went wrong</Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Lborad;
