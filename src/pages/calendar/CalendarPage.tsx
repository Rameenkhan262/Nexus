import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAuth } from "../../context/AuthContext";
import { useMeetings } from "../../context/MeetingContext";

export const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState("10:00"); // ✅ NEW
  const [slots, setSlots] = useState<any[]>([]);

  const { user } = useAuth();
  const role = user?.role;

  const { meetings, addMeeting, updateMeetingStatus } = useMeetings();

  // Add availability
  const addSlot = () => {
    setSlots([...slots, { date, time }]);
  };

  // Send request
  const sendRequest = () => {
    if (!role) return;

    addMeeting({
      date,
      time,
      status: "pending",
      requestedBy: role,
    });
    alert("Meeting requested!");
  };

  // Accept request
 const acceptRequest = (req: any) => {
  updateMeetingStatus(req, "confirmed");
};

const declineRequest = (req: any) => {
  updateMeetingStatus(req, "rejected");
};

  // Filters
  const confirmedMeetings = meetings.filter((m: any) => m.status === "confirmed");

const pendingRequests = meetings.filter(
  (m: any) => m.status === "pending"
);

  return (
    <div className="space-y-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-6">

     <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
  📅 Meeting Calendar
</h2>
      {/* BIG CALENDAR */}
      <div className="flex justify-center">
  <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
        <Calendar
          onChange={(value) => setDate(value as Date)}
          value={date}
          className="custom-calendar"
        />
      </div>
      </div>

      {/* TIME SELECT */}
      <div className="flex gap-4 items-center">
        <label className="text-sm font-medium">Select Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4">
        {role === "entrepreneur" && (
          <button
            onClick={addSlot}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Slot
          </button>
        )}

        <button
          onClick={sendRequest}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Request Meeting
        </button>
      </div>

      {/* AVAILABLE SLOTS */}
<div>
  <h3 className="font-semibold">🟢 Available Slots</h3>

  {slots.length === 0 && (
    <p className="text-gray-500 text-sm">No slots added</p>
  )}

  {slots.map((s: any, i: number) => (
    <div key={i} className="bg-green-100 p-2 rounded mb-2">
      {new Date(s.date).toDateString()} - {s.time}
    </div>
  ))}
</div>

      {/* REQUESTS */}
      {(role === "entrepreneur" || role === "investor") && (
        <div>
          <h3 className="font-semibold text-lg">📩 Requests</h3>

          {pendingRequests.length === 0 && (
            <p className="text-gray-500">No requests</p>
          )}

          {pendingRequests.map((r: any, i: number) => (
            <div key={i} className="bg-white p-3 rounded shadow flex justify-between">
              <div>
                <p>{new Date(r.date).toDateString()}</p>
                <p className="text-sm text-gray-500">{r.time}</p>
              </div>

              {role === "entrepreneur" && (
  <div className="flex gap-2">
    <button
      onClick={() => acceptRequest(r)}
      className="bg-green-500 text-white px-2 py-1 rounded"
    >
      Accept
    </button>

    <button
      onClick={() => declineRequest(r)}
      className="bg-red-500 text-white px-2 py-1 rounded"
    >
      Reject
    </button>
  </div>
)}
            </div>
          ))}
        </div>
      )}

      {/* CONFIRMED */}
      <div>
        <h3 className="font-semibold">✅ Confirmed Meetings</h3>

        {confirmedMeetings.length === 0 && (
          <p className="text-gray-500">No meetings</p>
        )}

        {confirmedMeetings.map((m: any, i: number) => (
          <div key={i} className="bg-white p-2 rounded shadow">
            {new Date(m.date).toDateString()} - {m.time}
          </div>
        ))}
      </div>
    </div>
  );
};