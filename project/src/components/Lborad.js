import React, { useState } from "react";
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
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Lborad = ({ testscoreData, searchSetter, changeData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
    //console.log("page");
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };
  //console.log(searchSetter.newSearch);
  //const searchParams = changeData();
  //const GAME = searchParams[0].game;
  //const date = searchParams[0].date;
  // const date = "2022-12-09";
  //const user = searchParams[0].usersearch;
  //console.log(GAME, date, user);
  //const PAGE = 1;
  const sessionUser = sessionStorage.getItem("user");
  const { username } = JSON.parse(sessionUser);
  const searchParams = changeData();
  let GAME = searchParams[0].game;
  let DATE = searchParams[0].date;
  let USER = searchParams[0].usersearch;
  let type = searchParams[0].type;
  if (!GAME) GAME = "nonogram";
  if (!DATE) DATE = "2022-12-09";
  if (!USER) USER = "";
  if (!type) type = "Default";
  const PAGE = 1;
  //let URL = `../.netlify/functions/server/score/u/password/following/1?game=nonogram&date=2022-12-09`;

  // Returns scores sorted by game, score, date.
  let URL = `../.netlify/functions/server/score/g/${GAME}/${PAGE}?date=${DATE}`;

  // Returns daily challenge scores of that day. //make game and daily exclusive cant pick both
  if (type === "Daily") {
    USER = username;
    URL = `../.netlify/functions/server/score/d/${DATE}/${PAGE}`;
  }

  // Returns scores of users followed by {USER}.
  if (USER === "Followed" && type !== "Daily") {
    type = "Default";
    let curUser = username;
    URL = `../.netlify/functions/server/score/u/${curUser}/following/${PAGE}?game=${GAME}&date=${DATE}`;
  }

  // Returns scores made by {USER}.
  if (USER === username && type !== "Daily") {
    URL = `../.netlify/functions/server/score/u/${USER}/${PAGE}?game=${GAME}&date=${DATE}`;
  }

  const { isLoading, isFetching, error, data } = useQuery(
    ["Leaderboards", searchParams[0]],
    async () => {
      const res = await axios.get(URL);
      return res.data;
    }
  );
  if (!isLoading) {
    //console.log(data);
  }
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data);
  }

  const HandleDailySearch = () => {};

  function HandleRegularSearch() {}

  return (
    <>
      <Box
        className="searchButtons"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 3,
          padding: 2,
        }}
      >
        <Button className="btn" onClick={HandleDailySearch}>
          Search daily
        </Button>
        <Button className="btn" onClick={HandleRegularSearch}>
          Search regular
        </Button>
      </Box>
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

            {!isLoading ? (
              testscoreData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data, index) => {
                  return (
                    <TableRow key={index} className="dataRow">
                      <TableCell key={data.user}>{data.user}</TableCell>
                      <TableCell key={data.game}>{data.game}</TableCell>
                      <TableCell key={data.challegeType}>
                        {data.challegeType}
                      </TableCell>
                      <TableCell key={data.score}>{data.score}</TableCell>
                      <TableCell key={data.time}>{data.time}</TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <>
                <Skeleton animation="wave"></Skeleton>
                <Skeleton animation="wave"></Skeleton>
                <Skeleton animation="wave"></Skeleton>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 5, 10]}
        component={"div"}
        count={testscoreData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      ></TablePagination>
    </>
  );
};

export default Lborad;
