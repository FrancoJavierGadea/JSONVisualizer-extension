// La función para formatear el JSON
function formatAndDisplayJson() {
  // Se ejecuta en el contexto de la página web
  const pageContent = document.body.innerText;
  try {
    // Remover todos los hijos de body
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }

    const divJson = document.createElement("div");
    divJson.setAttribute("id", "divJson");
    divJson.innerText = JSON.stringify(JSON.parse(pageContent), null, 2);

    // Agregar el divJson como único hijo de body
    document.body.appendChild(divJson);
  } catch (e) {
    console.error("No se pudo parsear el contenido como JSON", e);
  }
}

// Escucha las respuestas de la red
chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    // Busca el encabezado Content-Type
    const contentType = details.responseHeaders.find(
      (header) => header.name.toLowerCase() === "content-type",
    );

    // Si es JSON, inyecta el script
    if (
      contentType &&
      contentType.value.toLowerCase().includes("application/json")
    ) {
      chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        func: formatAndDisplayJson,
      });
      chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        files: ["content.js"],
        world: "MAIN",
      });
    } else {
      console.log("no es json");
    }
  },
  {
    urls: ["<all_urls>"],
    types: ["main_frame"],
  },
  ["responseHeaders"],
);
