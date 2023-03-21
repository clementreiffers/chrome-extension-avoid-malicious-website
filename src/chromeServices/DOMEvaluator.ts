import { DOMMessage, DOMMessageResponse } from "../types/types";

const messagesFromReactAppListener = (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: DOMMessageResponse) => void
) => {
  console.log("[content.js]. Message received", msg);
  const headlines = Array.from(document.getElementsByTagName<"h1">("h1")).map(
    (h1) => h1.innerText
  );
  const title = document.title;
  const url = window.location.href;
  const response: DOMMessageResponse = { title, headlines, url };

  if (url === "https://www.tesla.com/fr_fr") {
    window.location.replace("https://google.com");
  }
  sendResponse(response);
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
