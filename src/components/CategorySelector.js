import React from "react";
import i18n from "../text";

function CategorySelector(props) {
  const { items, onChange } = props;
  return (
    <nav>
      {items.map((it, ix) => (
        <button key={ix} onClick={() => onChange(it)}>
          {i18n.category[it] || `Unknown token ${it}`}
        </button>
      ))}
    </nav>
  );
}

export default CategorySelector;
