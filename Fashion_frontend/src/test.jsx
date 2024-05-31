import React, { useState,useEffect } from "react";
import axios from "axios";

function Test() {
  useEffect(() => {
    axios.get('http://localhost:3001/users')
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <></>
  );
}



export default Test