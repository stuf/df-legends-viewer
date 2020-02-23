import React, { useContext } from "react";
import { Link, useParams } from "@reach/router";
import * as R from "ramda";
import * as L from "partial.lenses";

import Legends from "core/context";
import * as M from "meta";
import { asNum } from "common/util";

export function Index(props) {
  return <div>{props.children}</div>;
}

export function List(props) {
  const data = useContext(Legends);
  const items = L.get(["artifacts", "artifact", L.valueOr([])], data);

  return (
    <section className="list-view">
      <header>Artifacts ({items.length} in total)</header>

      <section>
        <ul className="item-list">
          {items.map((it, ix) => (
            <li key={`artifact-${it.id}`}>
              <Link to={`${it.id}`}>{it.name}</Link>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export function Detail(props) {
  const id = asNum(props.id);
  const data = useContext(Legends);
  const item = L.get(
    ["artifacts", "artifact", L.find(R.whereEq({ id }))],
    data
  );

  if (!item || R.isEmpty(item)) {
    return (
      <article>
        <header>No artifact found</header>
        <div>
          <p>No artifact found with the ID {id}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="detail-view">
      <header>
        Artifact with id {props.id}; {item.name}
      </header>

      <dl>
        <dt>Name</dt>
        <dd>{item.name}</dd>

        <dt>Item</dt>
        <dd>
          <pre>
            <code>{JSON.stringify(item, null, 2)}</code>
          </pre>
        </dd>

        <dt>Site</dt>
        <dd>
          <Link to={`/sites/${item.site_id}`}>{item.site_id}</Link>
        </dd>
      </dl>
    </article>
  );
}
