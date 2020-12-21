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

async function getAllLinksTags() {
  const { rows: allLinksTags } = await client.query(`
  SELECT *
  FROM links_tags
  `);
  return allLinksTags;
}

async function createLink({ name, link, comment, tags }) {
  console.log("Creating a new link!");
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
    console.log("tagIds:", tagIds);

    const link_tags = await createLinkTags(createdLink.id, tagIds);

    return createdLink;
  } catch (error) {
    throw error;
  }
}

async function createTags(tags) {
  const tagIdArray = await Promise.all(
    tags.map(async (tag) => {
      const newTag = await createTag(tag);
      return newTag.id;
    })
  );

  return tagIdArray;
}

async function createTag(tag) {
  console.log("Creating a new tag!");
  try {
    const {
      rows: [createdTag],
    } = await client.query(
      `
      INSERT INTO tags(tag)
      VALUES ($1)
      ON CONFLICT (tag)
      DO
        UPDATE SET tag = $1
      RETURNING *
    `,
      [tag.toLowerCase()]
    );
    console.log("created tag:", createdTag);
    return createdTag;
  } catch (error) {
    throw error;
  }
}

async function createLinkTags(linkId, tagIdArray) {
  tagIdArray.forEach(async (id) => {
    await client.query(
      `
      INSERT INTO links_tags("linkId", "tagId")
      VALUES ($1, $2)
      RETURNING *
    `,
      [linkId, id]
    );
  });
}

async function getLinkById(linkId) {
  try {
    const {
      rows: [link],
    } = await client.query(
      `
    SELECT *
    FROM links
    WHERE id = $1
  `,
      [linkId]
    );
    return link;
  } catch (error) {
    throw error;
  }
}

async function updateClickCount(linkId) {
  try {
    const {
      rows: [updatedLink],
    } = await client.query(
      `
      UPDATE links
      SET "clickCount" = "clickCount" + 1
      WHERE id = $1
      RETURNING *
    `,
      [linkId]
    );
    return updatedLink;
  } catch (error) {
    throw error;
  }
}

async function getTagsByLinkId(linkId) {
  try {
    const { rows: tags } = await client.query(
      `
      SELECT tags.tag FROM links
      LEFT JOIN links_tags on links.id = links_tags."linkId"
      JOIN tags on links_tags."tagId" = tags.id
      WHERE links.id = $1;
      `,
      [linkId]
    );
    return tags;
  } catch (error) {
    throw error;
  }
}

async function getLinksByTag(tagId) {
  try {
    const { rows: tag_links } = await client.query(
      `
        SELECT * FROM links
        LEFT JOIN links_tags on links.id = links_tags."linkId"
        JOIN tags on links_tags."tagId" = tags.id
        WHERE "tagId" = $1
        `,
      [tagId]
    );
    console.log("associated linkId's:", tag_links);
    return tag_links;
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
  client,
  // db methods
  createLink,
  createTag,
  getAllLinks,
  getAllTags,
  getAllLinksTags,
  updateClickCount,
  getTagsByLinkId,
  getLinksByTag,
};

/*
join table command!

SELECT links.id, links.name, tags.tag FROM links
LEFT JOIN links_tags on links.id = links_tags."linkId"
JOIN tags on links_tags."tagId" = tags.id
WHERE links.id = 1

~ or ~

SELECT tags.tag FROM links
LEFT JOIN links_tags on links.id = links_tags."linkId"
JOIN tags on links_tags."tagId" = tags.id
WHERE links.id = 1;
*/
