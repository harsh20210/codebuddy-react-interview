import React from "react";
import Avatar from "@mui/material/Avatar";

export default function Post({ data }) {
  return (
      <div className="cardPost__cardStyleForPost">
        <img src={data.image} height="100%" width="100%" alt="loading..." />
        <Avatar alt="Remy Sharp" className="cardPost__cardStyleForPost--avatar" src={data.avatar} sx={{ width: 56, height: 56 }} />
        <h1> {data.firstName} {data.lastName} </h1>
        <p>{data.writeup}</p>
    </div>
  );
}
