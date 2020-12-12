// code to build and initialize DB goes here
const {
  client,
  createLink,
  createTag,
  getAllLinks,
  getAllTags,
} = require("./index");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("Starting to drop tables...");

    await client.query(`
      DROP TABLE IF EXISTS links_tags;
      DROP TABLE IF EXISTS links;
      DROP TABLE IF EXISTS tags;
    `);

    console.log("Finished dropping tables!");

    // build tables in correct order
    console.log("Starting to construct tables...");

    await client.query(`
      CREATE TABLE links(
        id SERIAL PRIMARY KEY,
        name varchar(255) NOT NULL,
        link varchar(255) NOT NULL,
        comment text NOT NULL,
        "clickCount" integer NOT NULL DEFAULT 0,
        "dateShared" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    
      CREATE TABLE tags(
        "tagId" SERIAL PRIMARY KEY,
        tag varchar(255) UNIQUE NOT NULL
      );

      CREATE TABLE links_tags(
        "linkId" INTEGER REFERENCES links(id),
        "tagId" INTEGER REFERENCES tags("tagId")
      );
      `);

    console.log("Finished constructing tables!");
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // initial data objects
    const fatCats = {
      name: "Fat Cats",
      link:
        "https://www.istockphoto.com/photos/fat-cat?phrase=fat%20cat&sort=mostpopular",
      comment: "I love fat cats!",
      tags: ["fat", "cats"],
    };

    const fatDogs = {
      name: "Fat Dogs",
      link:
        "https://www.istockphoto.com/photos/fat-dog?phrase=fat%20dog&sort=mostpopular",
      comment: "I love fat dogs!",
      tags: ["fat", "dogs"],
    };

    // create useful starting data

    console.log("Trying to populate initial data...");
    const testCats = await createLink(fatCats);
    const testDogs = await createLink(fatDogs);
    console.log("Finished populating initial data!");

    console.log("Logging initial data...");
    const allLinks = await getAllLinks();
    console.log("All links:", allLinks);
    const allTags = await getAllTags();
    console.log("All tags: ", allTags);
    console.log("Finished logging initial data!");
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
