// code to build and initialize DB goes here
const {
  client,
  createLink,
  createTag,
  getAllLinks,
  getAllTags,
  getAllLinksTags,
  updateClickCount,
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
    console.log("");

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
        id SERIAL PRIMARY KEY,
        tag varchar(255) UNIQUE NOT NULL
      );

      CREATE TABLE links_tags(
        "linkId" INTEGER REFERENCES links(id),
        "tagId" INTEGER REFERENCES tags(id)
      );
      `);

    console.log("Finished constructing tables!");
    console.log("");
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // initial data objects
    const headerFont = {
      name: "Phineas and Ferb Font",
      link: "https://fontmeme.com/fonts/ferbtastic-font/#previewtool",
      comment: "This is the font I used for the header!",
      tags: ["Phineas", "Ferb", "FoNt", "cartOON"],
    };

    const fatDog = {
      name: "Gracie is a fat dog",
      link: "https://www.instagram.com/drivingmegracie/",
      comment: "I love fat dogs!",
      tags: ["fat", "DOG", "chihuahua"],
    };

    const axiosDoc = {
      name: "Axios Documentation",
      link: "https://github.com/axios/axios",
      comment: "This is the documentation for Axios on GitHub",
      tags: ["Axios", "documentation", "github"],
    };

    // create useful starting data

    console.log("Trying to populate initial data...");
    console.log("");

    console.log("--- Creating fatCats ---");
    const testFont = await createLink(headerFont);
    console.log("");

    console.log("--- Creating fatDogs ---");
    const testDog = await createLink(fatDog);
    console.log("");

    console.log("--- Creating axios ---");
    const testAxiosDoc = await createLink(axiosDoc);
    console.log("");

    console.log("Logging initial data...");
    console.log("");

    const allLinks = await getAllLinks();
    console.log("All links:", allLinks);

    const allTags = await getAllTags();
    console.log("All tags: ", allTags);

    const allLinksTags = await getAllLinksTags();
    console.log("All links_tags: ", allLinksTags);
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
