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
  const items = L.get(["sites", "site", L.valueOr([])], data);

  return (
    <section className="list-view">
      <header>World Sites ({items.length} items in total)</header>

      <ul className="item-list">
        {items.map((item, ix) => (
          <li key={`site-${item.id}`}>
            <Link to={`${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Detail(props) {
  const id = asNum(props.id);
  const data = useContext(Legends);

  const item = L.get(["sites", "site", L.find(R.whereEq({ id }))], data);

  const artifacts = M.Site.artifactsIn(id)(data);

  const structures = L.get(
    [
      "structures",
      "structure",
      L.choose(x => (R.is(Object, x) ? L.reread(R.of) : L.valueOr([])))
    ],
    item
  );
  console.log({ structures });
  const hasStructures = !R.isEmpty(structures);

  return (
    <article className="detail-view">
      <header>
        site details {id}; {item.name}
      </header>

      <div>
        <dl>
          <dt>Name</dt>
          <dd>{item.name}</dd>

          <dt>Type</dt>
          <dd>{item.type}</dd>

          <dt>Coordinates</dt>
          <dd>{item.coords}</dd>

          <dt>BBox</dt>
          <dd>{item.rectangle}</dd>

          <dt>Artifacts</dt>
          <dd>
            <ul>
              {artifacts.map((it, ix) => (
                <li key={`artifact-${it.id}`}>
                  <Link to={`/artifacts/${it.id}`}>{it.name}</Link>
                </li>
              ))}
            </ul>
          </dd>

          <dt>Structures</dt>
          <dd>
            {hasStructures && (
              <ul>
                {structures.map((it, ix) => (
                  <li key={`site-${id}-structure-${it.local_id}`}>
                    {it.name} ({it.type})
                  </li>
                ))}
              </ul>
            )}
          </dd>

          <dt>Raw</dt>
          <dd>
            <pre>
              <code>{JSON.stringify(item, null, 2)}</code>
            </pre>
          </dd>
        </dl>
      </div>
    </article>
  );
}
