import { useCallback, useEffect, useState } from "react";
import "./licensePlate.css";

interface Predictions {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  class: string;
}

interface QueueResponse {
  time: number;
  image: string;
  predictions: Predictions[];
  text: string;
}

const LicensePlate = () => {
  const [image, setImage] = useState("");
  const [prediction, setPrediction] = useState<Predictions | null>(null);
  const [text, setText] = useState<string>("");
  const fetchImage = useCallback(async () => {
    const queue = await fetch("http://localhost:8000/checkQueue");
    const json = (await queue.json()) as unknown as QueueResponse;
    console.log(typeof queue.text);
    setImage(json.image);
    setPrediction(json.predictions[0]);
    setText(json.text);
    console.log(json);
  }, []);
  return (
    <div className="container">
      <button onClick={fetchImage}>Check Queue</button>
      {prediction && (
        <div>
          <p>Detection: {prediction?.class}</p>
          <p>Confidence: {prediction?.confidence}</p>
          <p>Text: {text}</p>
        </div>
      )}
      <img src={`data:image/png;base64, ${image}`} />
      {/* <div className="boundery"></div> */}
    </div>
  );
};

export { LicensePlate };
