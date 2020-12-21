import React from "react";

import { Nav, Col, ButtonGroup } from "react-bootstrap";

import CreateNewLink from "./CreateNewLink";
import SearchBar from "./SearchBar";
import SortButton from "./SortButton";

const SiteNav = ({
  allLinks,
  links,
  setLinks,
  newLinkRequest,
  searchVal,
  setSearchVal,
}) => {
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
        <SearchBar
          allLinks={allLinks}
          setLinks={setLinks}
          searchVal={searchVal}
          setSearchVal={setSearchVal}
        />
      </Col>
      <Col xs="auto">
        <ButtonGroup>
          <SortButton links={links} setLinks={setLinks} />
          <CreateNewLink
            links={links}
            setLinks={setLinks}
            newLinkRequest={newLinkRequest}
          />
        </ButtonGroup>
      </Col>
    </Nav>
  );
};

export default SiteNav;
