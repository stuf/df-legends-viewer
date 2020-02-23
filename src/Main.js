import React from "react";
import { Router } from "@reach/router";

import Legends from "core/context";
import legends from "data/legends.json";

import Index from "views/Index";
import Home from "views/Home";
import Category from "views/Category";
import NotFound from "views/NotFound";

import * as Region from "views/Region";
import * as Site from "views/Site";
import * as HistoricalFigure from "views/HistoricalFigure";
import * as Artifact from "views/Artifact";
import * as WrittenContent from "views/WrittenContent";

function Main(props) {
  return (
    <main>
      <Legends.Provider value={legends.df_world}>
        <Router>
          <Index path="/">
            <Home path="/" />

            <Artifact.Index path="artifacts">
              <Artifact.List path="/" />
              <Artifact.Detail path=":id" />
            </Artifact.Index>

            <Site.Index path="sites">
              <Site.List path="/" />
              <Site.Detail path=":id" />
            </Site.Index>

            <HistoricalFigure.Index path="historical-figures">
              <HistoricalFigure.List path="/" />
              <HistoricalFigure.Detail path=":id" />
            </HistoricalFigure.Index>

            <Region.Index path="regions">
              <Region.List path="/" />
              <Region.Detail path=":id" />
            </Region.Index>

            <WrittenContent.Index path="written-contents">
              <WrittenContent.List path="/" />
              <WrittenContent.Detail path=":id" />
            </WrittenContent.Index>

            <NotFound default />
          </Index>
        </Router>
      </Legends.Provider>
    </main>
  );
}

export default Main;
