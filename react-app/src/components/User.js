import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CSS/UserProfile.css";
import NavBar from "./NavBar";

function User() {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }

    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div className="user-profile-container">
      <div className="user-profile-left-container">
        <NavBar />
      </div>
      <div className="user-profile-mid-container">

      </div>
      <div className="user-profile-right-container">

      </div>
    </div>
  );
}
export default User;
