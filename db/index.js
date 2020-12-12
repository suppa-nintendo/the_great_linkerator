// Connect to DB
const { Client } = require("pg");
const DB_NAME = "linkerator";
const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);

// database methods

async function getAllLinks() {
  const { rows: allLinks } = await client.query(`
    SELECT *
    FROM links
  `);
  return allLinks;
}

async function getAllTags() {
  const { rows: allTags } = await client.query(`
    SELECT *
    FROM tags
  `);
  return allTags;
}

async function createLink({ name, link, comment, tags }) {
  console.log("Starting to generate a new link!");
  try {
    // creates a new link
    const {
      rows: [createdLink],
    } = await client.query(
      `
      INSERT INTO links(name, link, comment)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [name, link, comment]
    );

    const tagIds = await createTags(tags);
    console.log("tagIds: ", tagIds);

    console.log("Finished generating a new link!");
    return createdLink;
  } catch (error) {
    throw error;
  }
}

async function createTags(tags) {
  console.log("this is the create tags function");
  // initializes tagIdArray
  const tagIdArray = [];

  // gets all existing tags
  const allTags = await getAllTags();

  tags.forEach(async (tag) => {
    const newTag = await createTag(tag);
    tagIdArray.push(newTag.id);
  });
  return tagIdArray;
}

async function createTag(tag) {
  console.log("Starting to generate a new tag!");
  try {
    const {
      rows: [createdTag],
    } = await client.query(
      `
      INSERT INTO tags(tag)
      VALUES ($1)
      ON CONFLICT (tag)
      DO
        UPDATE SET tag = tags.tag
      RETURNING *
    `,
      [tag]
    );
    console.log("Finished generating a new tag!");
    console.log("created tag:", createdTag);
    return createdTag;
  } catch (error) {
    throw error;
  }
}
// insert fat @ id 1
// insert cats @ id2
// insert fat AGAIN @ id3, but theres a conflict
// update

// export
module.exports = {
  client,
  // db methods
  createLink,
  createTag,
  getAllLinks,
  getAllTags,
};
