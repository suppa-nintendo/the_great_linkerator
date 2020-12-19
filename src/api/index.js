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
    const { data } = await axios.get("/api/links");
    console.log("links: ", data);
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
    const { data } = await axios.post("/api/clickCount", { id: linkId });
    console.log("clicked link data:", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTagsByLinkId(linkId) {
  try {
    const { data } = await axios.get(`/api/links_tags/${linkId}`);
    return data;
  } catch (error) {
    throw error;
  }
}
