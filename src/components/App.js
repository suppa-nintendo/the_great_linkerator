// react stuff
import React, { useState, useEffect } from "react";

// import react-bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";

// my css
import "./index.css";

// functions
import {
  getAllLinks,
  getAllTags,
  newLinkRequest,
  updateClickCount,
  getTagsByLinkId,
  getLinksByTag,
} from "../api";

// other components
import LinksCards from "./LinkCards";
import Header from "./Header";
import SiteNav from "./SiteNav";

const App = () => {
  const [allLinks, setAllLinks] = useState([]);
  const [links, setLinks] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    async function bootstrapSite() {
      // gets initial link data to be rendered
      let linksData = await getAllLinks();

      // sorts the array so the most recent links appear first
      linksData.sort((a, b) => {
        a = a.id;
        b = b.id;
        return b - a;
      });

      // sets links into two pieces of state
      await setAllLinks(linksData);
      await setLinks(linksData);

      // gets initial tag data to be rendered
      let tagsData = await getAllTags();
      setTags(tagsData);

      // testing the getLinksByTag funtion
      // let test = await getLinksByTag(6);
      // console.log("my test:", test);
      // setLinks(test);
    }

    bootstrapSite();
  }, []);

  return (
    <>
      <div className="site-header">
        <Header />
      </div>
      <div className="site-body">
        <LinksCards
          links={links}
          allLinks={allLinks}
          setLinks={setLinks}
          updateClickCount={updateClickCount}
          getTagsByLinkId={getTagsByLinkId}
          setSearchVal={setSearchVal}
        />
      </div>
      <div className="site-footer">
        <SiteNav
          allLinks={allLinks}
          links={links}
          setLinks={setLinks}
          newLinkRequest={newLinkRequest}
          searchVal={searchVal}
          setSearchVal={setSearchVal}
        />
      </div>
    </>
  );
};

export default App;
