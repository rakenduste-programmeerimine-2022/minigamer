import React from "react";

export default function Cell({ details, updateFlag, revealCell }) {
  return (
    <div
      onContextMenu={(e) => updateFlag(e, details.x, details.y)}
      onClick={() => revealCell(details.x, details.y)}
      style={{
        height: 80,
        width: 80,
        background: "gray",
        textAlign: "center",
        border: "2px solid black",
        cursor: "pointer",
      }}
    >
      {details.revealed ? details.value : ""}
      {/*       {details.value !== 0 && details.value}
       */}
    </div>
  );
}
