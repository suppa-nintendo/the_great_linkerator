import React, { useState } from "react";

import { Dropdown } from "react-bootstrap";

const SortButton = ({ links, setLinks }) => {
  const [sortMessage, setSortMessage] = useState("Date Shared: Most Recent");

  function linkSorter(sortMethod) {
    let copy = [...links];

    // sorts clicks high to low
    if (sortMethod === 1) {
      copy.sort((a, b) => {
        a = a.clickCount;
        b = b.clickCount;
        return b - a;
      });

      //   sorts clicks low to high
    } else if (sortMethod === 2) {
      copy.sort((a, b) => {
        a = a.clickCount;
        b = b.clickCount;
        return a - b;
      });
    } else if (sortMethod === 3) {
      copy.sort((a, b) => {
        a = a.id;
        b = b.id;
        return b - a;
      });
    } else if (sortMethod === 4) {
      copy.sort((a, b) => {
        a = a.id;
        b = b.id;
        return a - b;
      });
    }

    // applies sorted array
    setLinks(copy);
  }

  return (
    <Dropdown drop="up">
      <Dropdown.Toggle id="sorter">Sort by: {sortMessage}</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => {
            setSortMessage("Clicks: High to Low");
            linkSorter(1);
          }}
        >
          Clicks: High to Low
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setSortMessage("Clicks: Low to High");
            linkSorter(2);
          }}
        >
          Clicks: Low to High
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          onClick={() => {
            setSortMessage("Date Shared: Most Recent");
            linkSorter(3);
          }}
        >
          Date Shared: Most Recent
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setSortMessage("Date Shared: Oldest");
            linkSorter(4);
          }}
        >
          Date Shared: Oldest
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortButton;
