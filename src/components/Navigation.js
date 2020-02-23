import React from "react";
import { Link } from "@reach/router";

function Navigation(props) {
  const { items } = props;

  return (
    <nav>
      <ul>
        {items.map(it => (
          <li key={it.id}>
            <Link to={`/${it.id}`}>{it.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
