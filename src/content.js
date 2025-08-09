import "@components-1812/json-visualizer";

//Define the custom element
const miDiv = document.querySelector("#divJson");

if (miDiv) {
  const jsonVisualizer = document.createElement("custom-json-visualizer");

  jsonVisualizer.renderDeep = 4;
  jsonVisualizer.textContent = miDiv.textContent;

  document.body.replaceChildren(jsonVisualizer);
}
