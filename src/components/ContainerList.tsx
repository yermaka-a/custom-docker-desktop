import { Channel, invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { FaPause, FaStop, FaTerminal } from "react-icons/fa";
import { Terminal } from "./Terminal";
import "./ContainerList.css";
interface Container {
  id: string;
  name: string;
  status: string;
  state: string;
}
export const ContainerList = () => {
  const [ContainerList, setContainers] = useState<Container[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [showLogs, setShowLogs] = useState<boolean>(false);

  const fetchContainers = async () => {
    try {
      const fetchedContainers: Container[] = await invoke("list_containers");
      setContainers(fetchedContainers);
    } catch (error) {
      console.error("Failed to fetch containers", error);
    }
  };

  const handleKill = async (tag: string) => {
    try {
      await invoke("kill_container", { name: tag });
      fetchContainers();
    } catch (error) {
      console.error("Failed to kill container", error);
    }
  };

  const handleStop = async (id: string) => {
    try {
      await invoke("stop_container", { name: id });
      fetchContainers();
    } catch (error) {
      console.error(`Failed to stop container ${id}:`, error);
    }
  };

  const handleLogs = async (name: string) => {
    try {
      const onEvent = new Channel<string>();
      onEvent.onmessage = (message) => {
        setLogs((prevLogs) => [...prevLogs, message]);
      };

      await invoke("emit_logs", { name: name, onEvent: onEvent });
      setShowLogs(true);
    } catch (error) {
      console.error(`Failed to fetch logs for container ${name}:`, error);
    }
  };

  useEffect(() => {
    fetchContainers();
  }, []);
  return (
    <div className="container-list-wrapper">
      <h2 className="title">Containers</h2>
      <div className="container-list">
        {ContainerList.map((c) => (
          <div key={c.id} className="container-item">
            <div>
              <h3 className="container-name">{c.name}</h3>
              <p>Status: {c.status}</p>
              <p>State: {c.state}</p>
            </div>
            <div className="container-actions">
              <button
                className="action-button stop"
                onClick={() => handleStop(c.name)}
              >
                <FaStop />
                Stop
              </button>
              <button
                className="action-button kill"
                onClick={() => handleKill(c.name)}
              >
                <FaPause />
                Kill
              </button>
              <button
                className="action-button logs"
                onClick={() => handleLogs(c.name)}
              >
                <FaTerminal />
                Kill
              </button>
            </div>
          </div>
        ))}
      </div>
      {showLogs && (
        <div className="logs-modal">
          <div className="logs-modal-content">
            <button
              className="close-button"
              onClick={() => {
                setLogs([]);
                setShowLogs(false);
              }}
            >
              Close
            </button>
            <Terminal logs={logs} />
          </div>
        </div>
      )}
    </div>
  );
};
