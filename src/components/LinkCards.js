import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const LinkCards = ({
  links,
  allLinks,
  setLinks,
  updateClickCount,
  setSearchVal,
}) => {
  function renderAllCards(linkArray) {
    return linkArray.map((link) => {
      return renderCard(link);
    });
  }

  function renderCard(singleLink) {
    if (singleLink) {
      const {
        id,
        name,
        link,
        comment,
        clickCount,
        dateShared,
        tags,
      } = singleLink;

      // converts dateShared to a more readable format
      let parsedDate = new Date(dateShared);

      // search function based on tag
      function searcher(val) {
        let copy = [...allLinks];
        let filtered = [];
        copy.forEach((link) => {
          link.tags.forEach((tag) => {
            if (tag.tag === val) {
              filtered.push(link);
            }
          });
        });
        setLinks(filtered);
      }

      const tagMapper = (tagsArray) => {
        return tagsArray.map((tagObject, index) => {
          return (
            <Button
              variant="outline-info"
              key={index}
              onClick={() => {
                setSearchVal(tagObject.tag);
                searcher(tagObject.tag);
              }}
            >
              {tagObject.tag}
            </Button>
          );
        });
      };

      // console.log('im testing dat parsers:' dateShared.parse().format(mm/dd/yy))

      return (
        <Card
          className="text-center link-card"
          id={id}
          border="dark"
          key={id}
          style={{
            marginBottom: "10px",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Card.Header>
            {name} | Clicked {clickCount} {clickCount === 1 ? "time" : "times"}
          </Card.Header>
          <Card.Body>
            <Card.Title>{comment}</Card.Title>
            <Card.Text
              onClick={() => {
                updateClickCount(id);
              }}
            >
              <a href={`${link}`} target="-blank">
                {link}
              </a>
            </Card.Text>
            <ButtonGroup size="sm">{tags ? tagMapper(tags) : ""}</ButtonGroup>
          </Card.Body>
          <Card.Footer className="text-muted">
            Shared: {parsedDate.toString()}
          </Card.Footer>
        </Card>
      );
    }
  }

  if (links.length) {
    return <>{renderAllCards(links)}</>;
  } else {
    return (
      <>
        <Card
          className="text-center link-card"
          border="danger"
          style={{
            marginBottom: "10px",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Card.Header>No links to display...</Card.Header>
          <Card.Body>
            <Card.Text>
              There's nothing here! Try searching for something else!
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
};

export default LinkCards;
