import "./NavigationBar.css";
import { FaDocker } from "react-icons/fa";

interface NavigationBarProps {
  activeTab: "containers" | "images";
  setActiveTab: (tab: "containers" | "images") => void;
}

export const NavigationBar = ({
  activeTab,
  setActiveTab,
}: NavigationBarProps) => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <FaDocker size={30} />
        <h1>Docker Manager</h1>
      </div>
      <button
        className={`tab ${activeTab === "containers" ? "active" : ""}`}
        onClick={() => setActiveTab("containers")}
      >
        Containers
      </button>
      <button
        className={`tab ${activeTab === "images" ? "active" : ""}`}
        onClick={() => setActiveTab("images")}
      >
        Images
      </button>
    </div>
  );
};
