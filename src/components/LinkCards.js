import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const LinkCards = ({ links, updateClickCount, getTagsByLinkId }) => {
  function renderAllCards(linkArray) {
    return linkArray.map((link) => {
      return renderCard(link, getTagsByLinkId);
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

      const tagMapper = (tagsArray) => {
        return tagsArray.map((tagObject, index) => {
          return (
            <Button variant="outline-info" key={index}>
              {tagObject.tag}
            </Button>
          );
        });
      };

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
          <Card.Header>{name}</Card.Header>
          <Card.Body>
            <Card.Title>{comment}</Card.Title>
            <Card.Text
              onClick={() => {
                console.log("hello you clicked a link!");
                updateClickCount(id);
              }}
            >
              <a href={`${link}`} target="-blank">
                {link}
              </a>
            </Card.Text>
          </Card.Body>
          <ButtonGroup size="sm">{tags ? tagMapper(tags) : ""}</ButtonGroup>
          <Card.Footer className="text-muted">
            Clicked: {clickCount} | Shared: {dateShared}
          </Card.Footer>
        </Card>
      );
    }
  }

  if (links) {
    return <>{renderAllCards(links)}</>;
  } else {
    return <>Cards Not Found</>;
  }
};

export default LinkCards;
