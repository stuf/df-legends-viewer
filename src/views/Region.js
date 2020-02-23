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
  const items = L.get(["regions", "region", L.valueOr([])], data);
  return (
    <section className="list-view">
      <header>Regions ({items.length} items in total)</header>

      <div>
        <ul className="item-list">
          {items.map(it => (
            <li key={`region-${it.id}`}>
              <Link to={`${it.id}`}>{it.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Detail(props) {
  return <article className="detail-view">regions detail {props.id}</article>;
}
