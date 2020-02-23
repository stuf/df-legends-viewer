import React, { useContext } from "react";
import { Router, useParams } from "@reach/router";
import * as R from "ramda";
import * as L from "partial.lenses";

import Legends from "core/context";

function CategoryView(props) {
  const { id } = props;
  const data = useContext(Legends);
  const ps = useParams();

  const items =
    L.get([id, L.valueOr({}), L.children, L.valueOr([])], data) || [];

  const first = L.get(L.first, items);
  const keys = L.collect([L.keys, L.valueOr([])], first);

  return (
    <section>
      <header>
        <h1>{id}</h1>
      </header>

      <table className="display-table">
        <thead>
          <tr>
            {keys.map(k => (
              <th key={k}>{k}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(items || []).map(it => (
            <tr key={`${id}-${it.id}`}>
              {R.pipe(R.props(keys), R.zip(keys), vs =>
                vs.map(([k, v]) => <td key={`${id}-${it.id}-${k}`}>{v}</td>)
              )(it)}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default CategoryView;
