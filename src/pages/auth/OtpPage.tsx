import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const { user } = useAuth();

  const verifyOtp = () => {
    if (otp === "1234") {
      navigate(
  user?.role === "entrepreneur"
    ? "/dashboard/entrepreneur"
    : "/dashboard/investor"
); 
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h2 className="text-xl font-semibold">🔐 Enter OTP</h2>

      <p className="text-sm text-gray-500">
  Demo OTP: <span className="font-semibold text-blue-600">1234</span>
</p>

      <input
        type="text"
        maxLength={4}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="border p-2 rounded text-center text-lg tracking-widest"
      />

      <button
        onClick={verifyOtp}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Verify
      </button>
    </div>
  );
};