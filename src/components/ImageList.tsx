import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { FaPlay, FaTrash } from "react-icons/fa";
import "./ImageList.css";

interface Image {
  id: string;
  repo_tag: string;
  size: string;
}

export const ImageList = () => {
  const [images, setImages] = useState<Image[]>([]);

  const fetchImages = async () => {
    try {
      const fetchedImages: Image[] = await invoke("list_images");
      setImages(fetchedImages);
    } catch (error) {
      console.error("Failed to fetch images: ", error);
    }
  };

  const handleRemove = async (tag: string) => {
    try {
      await invoke("remove_image", { image: tag });
      fetchImages();
    } catch (error) {
      console.error("Failed to remove image: ", error);
    }
  };

  const handleRun = async (tag: string) => {
    try {
      await invoke("create_container", { image: tag });
    } catch (error) {
      console.error("Failed to run image: ", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);
  return (
    <div>
      <h2 className="title">Images</h2>
      <div className="image-list">
        {images?.map((image) => (
          <div key={image.id} className="image-item">
            <div>
              <h3 className="image-name">{image.repo_tag}</h3>
              <p>Size: {image.size}</p>
            </div>
            <div className="image-actions">
              <button
                className="action-button run"
                onClick={() => handleRun(image.repo_tag)}
              >
                <FaPlay />
                Run
              </button>
              <button
                className="action-button remove"
                onClick={() => handleRemove(image.repo_tag)}
              >
                <FaTrash />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
