import { useEffect, useState } from "react";

const Simulator = () => {
  const [cdLevel, setCdLevel] = useState(0);
  const [status, setStatus] = useState("Idle");
  const [message, setMessage] = useState("");

  // Simulate reading carbon dioxide level data
  const readLevel = () => {
    return (Math.random() * 1000 + 400).toFixed(2); // Random carbon dioxide level between 400 ppm and 1400 ppm
  };

  // Function to send data to the backend
  const sendDataToServer = async () => {
    const level = readLevel();
    setCdLevel(level);
    setStatus("Sending...");

    if (parseFloat(level) > 1000 && parseFloat(level) < 2000) {
      setMessage("Might cause drowsiness");
    } else if (parseFloat(level) > 2000 && parseFloat(level) < 5000) {
      setMessage(
        "Might cause headaches, sleepiness, and stagnant, stale, stuffy air. Poor concentration, loss of attention, increased heart rate and slight nausea may also be present."
      );
    } else if (parseFloat(level) > 5000 && parseFloat(level) < 40000) {
      ("Might cause oxygen deprivation. Symptoms will worsen.");
    } else if (parseFloat(level) > 40000) {
      setMessage(
        "This level has an immediate harm on human health. It can cause serious health effects."
      );
    } else {
      setMessage("Good air exchange");
    }

    try {
      const response = await axios.post(
        "http://backend-server-url/api/carbon-dioxide",
        {
          deviceId: "device-001",
          carbonDioxideLevel: level,
        }
      );
      setStatus(`Sent: ${level} ppm`);
    } catch (error) {
      setStatus("Error sending data");
      console.error("Error:", error.message);
    }
  };

  // Use an effect to send data periodically
  useEffect(() => {
    const interval = setInterval(sendDataToServer, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Carbon Dioxide Detector</h1>
      <p>Current Carbon Dioxide Level: {cdLevel} ppm</p>
      <p>{message}</p>
      <p>Status: {status}</p>
    </div>
  );
};

export default Simulator;
