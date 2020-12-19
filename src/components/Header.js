import React from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";

const Header = () => {
  return (
    <Jumbotron
      fluid
      style={{
        height: "150px",
        // backgroundImage: 'url("doofen.png")',
        backgroundColor: "red",
        objectFit: "scale-down",
      }}
    >
      <Image
        style={{
          marginTop: "-50px",
          marginLeft: "auto",
          marginRight: "auto",
          height: "100px",
          display: "block",
        }}
        src="title.png"
      />
    </Jumbotron>
  );
};

export default Header;
