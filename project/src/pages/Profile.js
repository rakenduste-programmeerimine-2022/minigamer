import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function Profile() {
  let navigate = useNavigate();
  let { username } = useParams();
  return (
    <div>
      <button
        onClick={() => {
          navigate("/games");
        }}
      >
        Chnage to games
      </button>
      {username} Profile
    </div>
  );
}

export default Profile;
