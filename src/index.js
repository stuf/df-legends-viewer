import React from "react";
import { render } from "react-dom";
import "normalize.css";

import "./index.css";
import "styles/index.scss";
import Main from "./Main";
import * as serviceWorker from "./serviceWorker";

render(<Main />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
