import React, { useState } from "react";

import { Form } from "react-bootstrap";

const SearchBar = ({ allLinks, links, setLinks }) => {
  function searcher(val) {
    console.log("-------------------");
    console.log("search value:", val);
    let copy = [...allLinks];
    let filtered = [];
    console.log("copy:", copy);
    copy.forEach((link) => {
      let linkName = link.name.toLowerCase();
      let linkComment = link.comment.toLowerCase();
      if (linkName.includes(val)) {
        console.log("Match in name!");
        filtered.push(link);
      } else if (linkComment.includes(val)) {
        console.log("Match in comment!");
        filtered.push(link);
      } else {
        console.log("No match!");
      }
    });
    console.log("filtered copy:", filtered);
    setLinks(filtered);
  }

  return (
    <Form>
      <Form.Control
        style={{ width: "40%" }}
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          event.preventDefault();
          // console.log("allLinks:", allLinks);
          // console.log("links:", links);
          searcher(event.target.value);
        }}
      />
    </Form>
  );
};

export default SearchBar;
