import React, { useReducer } from "react";
import * as R from "ramda";
import * as L from "partial.lenses";
import logo from "./logo.svg";
import "./App.css";

import { navigation } from "./config";
import CategorySelector from "./components/CategorySelector";
import Pager from "./components/Pager";

import text from "./text";
import legends from "./data/legends.json";

const typeEq = t => a => a.type === t;

const reducer = (s, a) =>
  R.cond([
    [
      typeEq("VIEW"),
      _ => L.set(L.props("page", "view"), { page: 0, view: a.payload }, s)
    ],
    [typeEq("CHANGE_PAGE"), _ => L.modify("page", R.add(a.payload), s)]
  ])(a);

//

function App() {
  const [state, dispatch] = useReducer(reducer, {
    view: "regions",
    page: 0,
    pageSize: 100
  });

  const world = L.get("df_world", legends);

  const items = L.get([state.view, L.children], world);

  const pageOffset = state.page * state.pageSize;
  const pageOffsetEnd = pageOffset + state.pageSize;
  const pageItems = items.slice(pageOffset, pageOffsetEnd);

  const pageCount = Math.floor(items.length / state.pageSize);

  const hasNext = state.page < pageCount;
  const hasPrev = state.page > 0;

  return (
    <div className="App">
      <section className="navbar">
        <CategorySelector
          items={navigation}
          onChange={t => dispatch({ type: "VIEW", payload: t })}
        />
      </section>

      <section>
        <header>
          <h1>{text.category[state.view]}</h1>
        </header>

        <Pager
          {...{ hasNext, hasPrev }}
          onClick={n => dispatch({ type: "CHANGE_PAGE", payload: n })}
        />

        <div className="grid" style={{ width: 600 }}>
          {pageItems.map((it, ix) => (
            <React.Fragment key={`${state.view}-${ix}`}>
              <div>{it.id}</div>
              <div>{it.name}</div>
              <div>{it.type}</div>
            </React.Fragment>
          ))}
        </div>
      </section>

      <section>
        <pre>
          <code>{JSON.stringify(state, null, 2)}</code>
        </pre>
      </section>
    </div>
  );
}

export default App;
