const apiRouter = require("express").Router();

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "Welcome to the Great Linkerator!",
  });
});

module.exports = apiRouter;
