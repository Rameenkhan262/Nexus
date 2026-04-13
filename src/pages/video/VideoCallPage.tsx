import React, { useState, useEffect } from "react";

export const VideoCallPage = () => {
  const [inCall, setInCall] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [screenShare, setScreenShare] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
  let interval: any;

  if (inCall) {
    interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  } else {
    setSeconds(0); // reset when call ends
  }

  return () => clearInterval(interval);
}, [inCall]);

   const formatTime = (sec: number) => {
  const mins = Math.floor(sec / 60);
  const secs = sec % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};


  // Drag state
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragging, setDragging] = useState(false);

  // Handlers
  const handleMouseDown = () => setDragging(true);
  const handleMouseUp = () => setDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
  if (dragging) {
    const container = e.currentTarget.getBoundingClientRect();

    let newX = e.clientX - container.left - 80;
    let newY = e.clientY - container.top - 50;

    // 🔒 Keep inside bounds
    const maxX = container.width - 160;
    const maxY = container.height - 110;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    setPosition({ x: newX, y: newY });
  }
};

  return (
    <div className="h-screen bg-black flex flex-col justify-between">

      {/* VIDEO AREA */}
      <div
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="flex-1 relative flex items-center justify-center text-white text-xl"
      >
        {/* Main Video */}
        {inCall ? "📹 Live Video (Mock)" : "No Active Call"}

        {inCall && (
          <>
            {/* DRAGGABLE PREVIEW */}
            <div
              onMouseDown={handleMouseDown}
              style={{
                position: "absolute",
                top: position.y,
                left: position.x,
              }}
              className="w-40 h-28 bg-gray-800 rounded-lg flex items-center justify-center text-sm shadow-lg border border-gray-700 cursor-move"
            >
              👤 You
            </div>

            {/* LIVE INDICATOR */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full text-white text-xs shadow-md">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              LIVE
            </div>

            {/* TIMER */}
  <div className="bg-black bg-opacity-60 px-3 py-1 rounded text-xs text-white">
    ⏱ {formatTime(seconds)}
  </div>
          </>
        )}
      </div>

      {/* FLOATING CONTROLS */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-900 bg-opacity-80 backdrop-blur-md px-6 py-3 rounded-full flex gap-4 shadow-lg">

          {/* Start / End */}
          {!inCall ? (
            <button
              onClick={() => setInCall(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full"
            >
              Start
            </button>
          ) : (
            <button
              onClick={() => setInCall(false)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full"
            >
              End
            </button>
          )}

          {/* Mic */}
          <button
            onClick={() => setMicOn(!micOn)}
            className={`px-4 py-2 rounded-full text-white ${
              micOn ? "bg-blue-600" : "bg-gray-500"
            }`}
          >
            🎤
          </button>

          {/* Camera */}
          <button
            onClick={() => setCameraOn(!cameraOn)}
            className={`px-4 py-2 rounded-full text-white ${
              cameraOn ? "bg-blue-600" : "bg-gray-500"
            }`}
          >
            📷
          </button>

          {/* Screen Share */}
          <button
            onClick={() => setScreenShare(!screenShare)}
            className={`px-4 py-2 rounded-full text-white ${
              screenShare ? "bg-purple-600" : "bg-gray-500"
            }`}
          >
            🖥️
          </button>

        </div>
      </div>
    </div>
  );
};