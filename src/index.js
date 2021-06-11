import "./main.css";
import { Elm } from "./PhotoFolders.elm";
import * as serviceWorker from "./serviceWorker";

const app = Elm.PhotoFolders.init({
  node: document.getElementById("root"),
  // flags: Pasta.version,
});

// app.ports.setFilters.subscribe((options) => {
//   requestAnimationFrame(() => {
//     Pasta.apply(document.getElementById("main-canvas"), options);
//   });
// });

// Pasta.addActivityListener((activity) => {
//   app.ports.activityChanges.send(activity);
// });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
