import React from "react";

export default function Cell({ details, updateFlag, revealCell }) {
  const cellstyle = {
    background: details.revealed
      ? details.value === "X"
        ? "red" // bomb color
        : "#e5c29f" // revealed color
      : "#aad751", // hidden color
    color: details.flagged === false && numColorCode(details.value), //nrs color
  };

  return (
    <div
      onContextMenu={(e) => updateFlag(e, details.x, details.y)}
      onClick={() => revealCell(details.x, details.y)}
      style={cellstyle}
      className="cell"
    >
      {!details.revealed && details.flagged
        ? "F"
        : details.revealed && details.value !== 0
        ? details.value === "X"
          ? "B" //bomb icon here
          : details.value
        : ""}
      {/*       {details.value !== 0 && details.value}
       */}
    </div>
  );
}
const numColorCode = (num) => {
  if (num === 1) {
    return "blue";
  } else if (num === 2) {
    return "green";
  } else if (num === 3) {
    return "red";
  } else if (num === 4) {
    return "purple";
  } else if (num === 5) {
    return "yellow";
  } else if (num === 6) {
    return "pink";
  } else {
    return "white";
  }
};
