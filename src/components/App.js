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
} from "../api";

// other components
import LinksCards from "./LinkCards";
import Header from "./Header";
import SiteNav from "./SiteNav";

const App = () => {
  const [allLinks, setAllLinks] = useState([]);
  const [links, setLinks] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function bootstrapSite() {
      // gets initial link data to be rendered
      let linksData = await getAllLinks();

      // sets links into two pieces of state
      setAllLinks(linksData);
      setLinks(linksData);

      // gets initial tag data to be rendered
      let tagsData = await getAllTags();
      setTags(tagsData);
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
          updateClickCount={updateClickCount}
          getTagsByLinkId={getTagsByLinkId}
        />
      </div>
      <div className="site-footer">
        <SiteNav
          allLinks={allLinks}
          links={links}
          setLinks={setLinks}
          newLinkRequest={newLinkRequest}
        />
      </div>
    </>
  );
};

export default App;
