import { useState } from "react";
import "./App.css";
import { NavigationBar } from "./components/NavigationBar";
import { ContainerList } from "./components/ContainerList";
import { ImageList } from "./components/ImageList";

export const App = () => {
  const [activeTab, setActiveTab] = useState<"containers" | "images">(
    "containers"
  );

  return (
    <div className="app">
      <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content">
        {activeTab === "containers" ? <ContainerList /> : <ImageList />}
      </div>
    </div>
  );
};
