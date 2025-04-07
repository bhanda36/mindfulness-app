import { renderHomePage, renderDayPage } from "./MindfulnessApp.js";

const urlParams = new URLSearchParams(window.location.search);
const day = urlParams.get("day");

const app = document.getElementById("root");

if (!day) {
  app.appendChild(renderHomePage());
} else {
  app.appendChild(renderDayPage(parseInt(day)));
}
