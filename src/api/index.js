import axios from "axios";

export async function getSomething() {
  try {
    const { data } = await axios.get("/api");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllLinks() {
  try {
    // gets all links in the database
    const { data } = await axios.get("/api/links");

    // adds the appropriate tags to the each link in the array
    await data.forEach(async (link) => {
      const link_tags = await getTagsByLinkId(link.id);
      link.tags = [...link_tags];
    });

    console.log("links:", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllTags() {
  try {
    const { data } = await axios.get("/api/tags");
    console.log("tags:", data);
  } catch (error) {
    throw error;
  }
}

export async function newLinkRequest(newLinkData) {
  try {
    console.log("newLinkData:", newLinkData);
    const { data } = await axios.post("/api/links", newLinkData);
    console.log("newLink:", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateClickCount(linkId) {
  try {
    const { data } = await axios.post("/api/links/clickCount", { id: linkId });
    console.log("clicked link data:", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTagsByLinkId(linkId) {
  try {
    const { data } = await axios.get(`/api/links/links_tags/${linkId}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getLinksByTag(tagId) {
  try {
    const { data } = await axios.get(`/api/tags/links_tags/${tagId}`);
    console.log("this is the getlinksbytag data:", data);
    return data;
  } catch (error) {
    throw error;
  }
}
