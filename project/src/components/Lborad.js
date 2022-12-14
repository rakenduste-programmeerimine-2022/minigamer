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

const Lborad = ({ testscoreData, searchSetter, changeData }) => {
  //const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
    //console.log("page");
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const sessionUser = sessionStorage.getItem("user");
  const { username } = JSON.parse(sessionUser);
  console.log(sessionUser);
  const searchParams = changeData();
  let GAME = searchParams[0].game;
  let DATE = searchParams[0].date;
  let USER = searchParams[0].usersearch;
  const [PAGE, setPAGE] = useState(1);
  let scores = [];
  console.log(GAME, DATE, USER);
  /* 
  // Returns scores of users followed by {USER}.
  if (USER === "Followed" && GAME !== "Daily") {
    URL = `../.netlify/functions/server/score/u/${username}/following/${PAGE}?game=${GAME}&date=${DATE}`;
  }
  // Returns scores made by {USER}. you
  if (USER === "You" && GAME !== "Daily") {
    curUser = username;
    URL = `../.netlify/functions/server/score/u/${curUser}/${PAGE}?game=${GAME}&date=${DATE}`;
  }
  // Returns scores made by {USER}.
  if (
    USER !== "You" &&
    USER !== "Followed" &&
    USER !== "everyone" &&
    GAME !== "Daily"
  ) {
    curUser = USER;
    URL = `../.netlify/functions/server/score/u/${curUser}/${PAGE}?game=${GAME}&date=${DATE}`;
  }

  if (GAME === "All") {
    URL = `../.netlify/functions/server/score/u/testuser/1?date=2022-12-14`;
  } */

  let URL = `../.netlify/functions/server/score/g/nonogram/${PAGE}`;
  // search games by date or all dates
  if (GAME && GAME !== "Daily" && !USER) {
    URL = `../.netlify/functions/server/score/g/${GAME}/${PAGE}`;
    if (DATE) {
      URL = `../.netlify/functions/server/score/g/${GAME}/${PAGE}?date=${DATE}`;
    }
  }

  //Daily challenge of set day
  if (GAME === "Daily") {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
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

  const [page, setPage] = useState(1);
  const { isLoading, isFetching, error, data } = useQuery(
    ["Leaderboards", searchParams[0]],
    async () => {
      const res = await axios.get(URL);
      return res.data;
    }
    /* { initialData: "" } */
  );

  if (!isLoading) {
    //console.log(data);
  }

  useEffect(() => {
    if (error) {
      console.log(error);
      setOpen(true);
    }
  }, [error]);

  if (data) {
    scores = data.object.scores;
    console.log(data);
  }

  return (
    <>
      <TableContainer className="board">
        <Table className="boardTable">
          <TableBody>
            <TableRow className="titleRow">
              <TableCell key={"user"}>User</TableCell>
              <TableCell key={"game"}>Game</TableCell>
              <TableCell key={"Challenge Type"}>Challenge Type</TableCell>
              <TableCell key={"Score"}>Score</TableCell>
              <TableCell key={"Time"}>Time</TableCell>
            </TableRow>
            {data ? (
              scores //scores //testscoreData
                /*.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)*/
                .map((data, index) => {
                  return (
                    <TableRow key={index} className="dataRow">
                      <TableCell key={data.username + index}>
                        {data.username}
                      </TableCell>
                      <TableCell key={data.gameID + index + "game"}>
                        {USER !== "everyone"
                          ? data.gameID === 0
                            ? "Nonogram"
                            : data.gameID === 1
                            ? "Minesweeper"
                            : "Flood"
                          : GAME}
                      </TableCell>
                      <TableCell
                        key={
                          GAME === "Daily" + index ? GAME : "Default" + index
                        }
                      >
                        {GAME === "Daily" ? GAME : "Default"}
                      </TableCell>
                      <TableCell key={data.score}>{data.score}</TableCell>
                      <TableCell key={DATE}>{data.date}</TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <>
                <TableRow
                  className="dataRow placeholder"
                  sx={{ width: 500, height: 500 }}
                ></TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[2, 5, 10]}
        component={"div"}
        count={testscoreData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      ></TablePagination> */}
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
