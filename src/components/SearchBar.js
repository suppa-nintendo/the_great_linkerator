import React from "react";

import { Form } from "react-bootstrap";

const SearchBar = ({ allLinks, setLinks, searchVal, setSearchVal }) => {
  function searcher(val) {
    let copy = [...allLinks];
    let filtered = [];
    copy.forEach((link) => {
      let linkName = link.name.toLowerCase();
      let linkComment = link.comment.toLowerCase();
      let linkUrl = link.link.toLowerCase();
      if (linkName.includes(val)) {
        filtered.push(link);
      } else if (linkComment.includes(val)) {
        filtered.push(link);
      } else if (linkUrl.includes(val)) {
        filtered.push(link);
      }
    });
    setLinks(filtered);
  }

  return (
    <Form>
      <Form.Control
        style={{ width: "40%" }}
        type="text"
        value={searchVal}
        placeholder="Search..."
        onChange={(event) => {
          event.preventDefault();
          setSearchVal(event.target.value);
          searcher(event.target.value);
        }}
      />
    </Form>
  );
};

export default SearchBar;
