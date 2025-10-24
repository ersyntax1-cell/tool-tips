import { createRoot } from "react-dom/client";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import ModalLayout from "../layouts/modal-layout/modal-layout";

function appendApp() {
  const existing = document.getElementById("my-extension-root");
  if (existing) {
    existing.remove();
    return;
  }

  const container = document.createElement("div");
  container.id = "my-extension-root";
  document.body.appendChild(container);

  const shadow = container.attachShadow({ mode: "open" });

  const wrapper = document.createElement("div");
  Object.assign(wrapper.style, {
    width: "100vw",
    height: "100vh",
  });
  shadow.appendChild(wrapper);

  const emotionRoot = document.createElement("style");
  shadow.appendChild(emotionRoot);

  const cache = createCache({
    key: "mui",
    prepend: true,
    container: emotionRoot,
  });

  const reactRoot = document.createElement("div");
  wrapper.appendChild(reactRoot);

  const root = createRoot(reactRoot);
  root.render(
    <CacheProvider value={cache}>
      <ModalLayout />
    </CacheProvider>
  );
}

appendApp();