import React from "react";

function Pager(props) {
  const { hasPrev, hasNext, onClick } = props;

  return (
    <nav>
      <button onClick={() => onClick(-1)}>Prev</button>

      <button onClick={() => onClick(1)}>Next</button>
    </nav>
  );
}

export default Pager;
