import React from "react";

const UserLists = ({ user, handleClick }) => {
  // console.log("first", user);
  return (
    <div
      onClick={handleClick}
      style={{
        backgroundColor: "#e8f6ff",
        padding: ".6rem .6rem",
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          background: "rgb(220 235 245)",
          borderRadius: "100%",
          textAlign: "center",
          lineHeight: "40px",
          marginRight: "6px",
          overflow: "hidden",
        }}
      >
        {user?.image === "" ? (
          <img src={"/images/user.png"} style={{ width: "25px" }} />
        ) : (
          <img src={user?.image} style={{ width: "70px" }} />
        )}
      </div>
      <div style={{ fontSize: "15px", fontWeight: "500" }}>
        <div>{user?.name}</div>
        <div>{user.email}</div>
      </div>
    </div>
  );
};

export default UserLists;
