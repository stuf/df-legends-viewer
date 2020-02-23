import React, { useContext } from "react";
import { Link, useParams } from "@reach/router";
import * as R from "ramda";
import * as L from "partial.lenses";

import Legends from "core/context";
import { asNum } from "common/util";

export function Index(props) {
  return <div>{props.children}</div>;
}

export function List(props) {
  const data = useContext(Legends);
  const items = L.get(
    ["written_contents", "written_content", L.valueOr([])],
    data
  );

  return (
    <section className="list-view">
      <header>Written Content ({items.length} items in total)</header>

      <div>
        <ul className="item-list">
          {items.map((it, ix) => (
            <li key={`written-content-${it.id}`}>
              <Link to={`${it.id}`}>{it.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Detail(props) {
  const id = asNum(props.id);
  const data = useContext(Legends);

  const item = L.get(
    ["written_contents", "written_content", L.find(R.whereEq({ id }))],
    data
  );

  return (
    <article className="detail-view">
      <header>
        {item.title} by {item.author_hfid}
      </header>

      <dl>
        <dt>Title</dt>
        <dd>{item.title}</dd>

        <dt>Form</dt>
        <dd>{item.form}</dd>

        <dt>Author</dt>
        <dd>
          <Link to={`/author/${item.author_hfid}`}>{item.author_hfid}</Link>
        </dd>

        <dt>Quality</dt>
        <dd>{item.author_roll}</dd>
      </dl>

      <pre>
        <code>{JSON.stringify(item, null, 2)}</code>
      </pre>
    </article>
  );
}
