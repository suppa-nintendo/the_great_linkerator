import React from "react";

import { Nav, Button, Col } from "react-bootstrap";

import CreateNewLink from "./CreateNewLink";
import SearchBar from "./SearchBar";

const SiteNav = ({ allLinks, links, setLinks, newLinkRequest }) => {
  return (
    <Nav
      style={{
        // backgroundImage: 'url("images/trees.jpg")',
        backgroundColor: "#A9A6DB",
        paddingTop: "10px",
        paddingBottom: "10px",
      }}
    >
      <Col>
        <SearchBar allLinks={allLinks} links={links} setLinks={setLinks} />
      </Col>
      <Col xs="auto">
        <CreateNewLink
          links={links}
          setLinks={setLinks}
          newLinkRequest={newLinkRequest}
        />
      </Col>
    </Nav>
  );
};

export default SiteNav;
