const apiRouter = require("express").Router();

const {
  getAllLinks,
  getAllTags,
  createLink,
  updateClickCount,
  getTagsByLinkId,
  getLinksByTag,
} = require("../db/index");

apiRouter.get("/links", async (req, res, next) => {
  console.log("A GET request is being made to /links");
  try {
    const allLinks = await getAllLinks();
    res.send(allLinks);
  } catch (error) {
    throw error;
  }
});

apiRouter.get("/tags", async (req, res, next) => {
  console.log("A GET request is being made to /tags");
  try {
    const allTags = await getAllTags();
    res.send(allTags);
  } catch (error) {
    throw error;
  }
});

apiRouter.post("/links", async (req, res, next) => {
  console.log("A POST request is being made to /links");
  try {
    const newLink = await createLink(req.body.link);
    res.send(newLink);
  } catch (error) {
    throw error;
  }
});

apiRouter.post("/links/clickCount", async (req, res, next) => {
  console.log("A POST request is being made to /links/clickCount");
  try {
    const updatedLink = await updateClickCount(req.body.id);
    res.send(updatedLink);
  } catch (error) {
    throw error;
  }
});

apiRouter.get("/links/links_tags/:id", async (req, res, next) => {
  try {
    console.log("A GET request is being made to /links/links_tags/:id");
    const link_tags = await getTagsByLinkId(req.params.id);
    res.send(link_tags);
  } catch (error) {
    throw error;
  }
});

apiRouter.get("/tags/links_tags/:id", async (req, res, next) => {
  try {
    console.log("A GET request is being made to /tags/links_tags/:id");
    const tag_links = await getLinksByTag(req.params.id);
    res.send(tag_links);
  } catch (error) {
    throw error;
  }
});

module.exports = apiRouter;
