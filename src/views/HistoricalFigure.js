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
  const items = L.get(
    ["historical_figures", "historical_figure", L.valueOr([])],
    data
  );

  return (
    <section className="list-view">
      <header>Historical Figures ({items.length} items in total)</header>

      <ul className="item-list">
        {items.map((it, ix) => (
          <li key={`historical-figure-${it.id}`}>
            <Link to={`${it.id}`}>{it.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Detail(props) {
  const id = asNum(props.id);
  const data = useContext(Legends);

  const item = L.get(
    ["historical_figures", "historical_figure", L.find(R.whereEq({ id }))],
    data
  );

  return (
    <article className="detail-view">
      <header>{item.name}</header>

      <dl>
        <dt>Name</dt>
        <dd>{item.name}</dd>

        <dt>Race</dt>
        <dd>{item.race}</dd>

        <dt>Caste</dt>
        <dd>{item.caste}</dd>

        <dt>Appeared</dt>
        <dd>{item.appeared}</dd>

        <dt>Birth</dt>
        <dd>
          Year {item.birth_year}, seconds72 {item.birth_seconds72}
        </dd>

        <dt>Death</dt>
        <dd>
          Year {item.death_year}, seconds72 {item.death_seconds72}
        </dd>

        <dt>Associated type</dt>
        <dd>{item.associated_type}</dd>

        <dt>Entity links</dt>
        <dd>
          <ul>
            {(item.entity_link || []).map(link => (
              <li key={`hf-${item.id}-link-${link.entity_id}`}>
                <Link to={`/entity/${link.entity_id}`}>
                  {link.entity_id} ({link.link_type})
                </Link>
              </li>
            ))}
          </ul>
        </dd>

        <dt>Site</dt>
        <dd>
          {item.site_link ? (
            <>
              {item.site_link.site_id} ({item.site_link.link_type})
            </>
          ) : null}
        </dd>

        <dt>Sphere</dt>
        <dd>
          <ul>
            {item.sphere
              ? item.sphere.map((s, si) => <li key={si}>{s}</li>)
              : null}
          </ul>
        </dd>
      </dl>
    </article>
  );
}
