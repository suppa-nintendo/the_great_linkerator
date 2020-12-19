import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const NewLinkForm = ({
  linkName,
  setLinkName,
  linkUrl,
  setLinkUrl,
  linkComment,
  setLinkComment,
  linkTags,
  setLinkTags,
}) => {
  return (
    <Form>
      <Form.Group controlId="formGridTitle">
        <Form.Label>Link Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Google, YouTube, etc..."
          value={linkName}
          onChange={(event) => {
            setLinkName(event.target.value);
          }}
        />
      </Form.Group>
      <Form.Group controlId="formGridUrl">
        <Form.Label>Link URL</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="www.google.com, www.youtube.com, etc..."
          value={linkUrl}
          onChange={(event) => {
            setLinkUrl(event.target.value);
          }}
        />
      </Form.Group>
      <Form.Group controlId="formGridComment">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          required
          as="textarea"
          rows={3}
          placeholder="Enter a comment for your link..."
          value={linkComment}
          onChange={(event) => {
            setLinkComment(event.target.value);
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Tags</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="gooogle, search, videos, community, etc..."
          value={linkTags}
          onChange={(event) => {
            setLinkTags(event.target.value);
          }}
        />
      </Form.Group>
    </Form>
  );
};

const CreateNewLink = ({ links, setLinks, newLinkRequest }) => {
  // modal usestate
  const [showCreateNewLink, setShowCreateNewLink] = useState(false);

  const handleClose = () => setShowCreateNewLink(false);
  const handleShow = () => setShowCreateNewLink(true);

  // useState for new link form
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkComment, setLinkComment] = useState("");
  const [linkTags, setLinkTags] = useState([]);

  const handleLinkSubmit = async (event) => {
    event.preventDefault();

    let parsedLinkTags = linkTags.trim().split(",");

    let trimmedLinkTags = [];

    for (let i = 0; i < parsedLinkTags.length; i++) {
      trimmedLinkTags.push(parsedLinkTags[i].trim());
    }

    let newLink = {
      link: {
        name: linkName,
        link: linkUrl,
        comment: linkComment,
        tags: [...trimmedLinkTags],
      },
    };

    let linkToPush = await newLinkRequest(newLink);
    linkToPush.tags = [...trimmedLinkTags];
    let copy = [...links];
    copy.push(linkToPush);
    console.log("copyArray:", copy);
    setLinks(copy);

    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create New Link
      </Button>

      <Modal
        show={showCreateNewLink}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewLinkForm
            linkName={linkName}
            setLinkName={setLinkName}
            linkUrl={linkUrl}
            setLinkUrl={setLinkUrl}
            linkComment={linkComment}
            setLinkComment={setLinkComment}
            linkTags={linkTags}
            setLinkTags={setLinkTags}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLinkSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateNewLink;
