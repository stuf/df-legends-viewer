import React, { useContext } from "react";
import { Link } from "@reach/router";

import Legends from "core/context";
import Navigation from "components/Navigation";

function Index(props) {
  const { children } = props;
  const legends = useContext(Legends);
  console.log({ legends });

  const items = [
    {
      id: "regions",
      name: "Regions"
    },
    { id: "sites", name: "Sites" },
    { id: "historical-figures", name: "Historical Figures" },
    { id: "artifacts", name: "Artifacts" },
    { id: "written-contents", name: "Written Contents" }
  ];

  return (
    <section className="layout">
      <nav className="layout__navigation">
        <Navigation items={items} />
      </nav>
      <div className="layout__content">{children}</div>
    </section>
  );
}

export default Index;
