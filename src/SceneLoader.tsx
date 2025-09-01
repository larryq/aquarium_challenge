import { Html, useGLTF, useProgress } from "@react-three/drei";

useGLTF.preload("/tank and fish.glb");

export default function SceneLoader() {
  const { active, progress, errors, item, loaded, total } = useProgress();

  if (errors.length > 0) {
    console.error("Loading errors:", errors);
  }

  return active ? (
    <Html center>
      <div
        style={{
          background: "rgba(0, 0, 0, 0.7)",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <p>Loading {item}...</p>
        <div
          style={{
            width: "200px",
            height: "10px",
            background: "#333",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "#4caf50",
              transition: "width 0.3s ease",
            }}
          />
        </div>
        <p>
          {progress.toFixed(2)}% ({loaded}/{total})
        </p>
      </div>
    </Html>
  ) : null;
}
