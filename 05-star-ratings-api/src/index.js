import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import StartRating from "./StartRating";
// import App from "./App";

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StartRating maxRating={5} />
    <StartRating maxRating={10} />
    <StartRating />
    {/* <App /> */}
  </React.StrictMode>,
);

// React before 18
// ReactDOM.render(<App />, document.getElementById("root"));
