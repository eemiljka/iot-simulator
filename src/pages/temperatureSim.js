import { useState, useEffect } from "react";
import axios from "axios";

const Simulator = () => {
  const [temperature, setTemperature] = useState(0);
  const [status, setStatus] = useState("Idle");

  // Simulate reading temperature data
  const readTemperature = () => {
    return (Math.random() * 30 + 15).toFixed(2); // Random temperature between 15°C and 45°C
  };

  // Function to send data to the backend
  const sendDataToServer = async () => {
    const temp = readTemperature();
    setTemperature(temp);
    setStatus("Sending...");

    try {
      const response = await axios.post(
        "http://backend-server-url/api/temperature",
        {
          deviceId: "device-001",
          temperature: temp,
        }
      );
      setStatus(`Sent: ${temp}°C`);
    } catch (error) {
      setStatus("Error sending data");
      console.error("Error:", error.message);
    }
  };

  // Use an effect to send data periodically
  useEffect(() => {
    const interval = setInterval(sendDataToServer, 5000);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Temperature Detector</h1>
      <p>Current Temperature: {temperature}°C</p>
      <p>Status: {status}</p>
    </div>
  );
};

export default Simulator;
