import React from "react";
import "./Stylesheets/App.scss";
import { DOMMessage, DOMMessageResponse } from "./types/types";

function App() {
  const [title, setTitle] = React.useState("rien");
  const [headlines, setHeadlines] = React.useState<string[]>([]);
  const [url, setUrl] = React.useState<string>("");

  React.useEffect(() => {
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          chrome.tabs.sendMessage(
            tabs[0].id || 0,
            { type: "GET_DOM" } as DOMMessage,
            (response: DOMMessageResponse) => {
              setTitle(response.title);
              setHeadlines(response.headlines);
              setUrl(response.url);
            }
          );
        }
      );
  }, [setTitle, setHeadlines]);

  return <div>{url}</div>;
}

export default App;
