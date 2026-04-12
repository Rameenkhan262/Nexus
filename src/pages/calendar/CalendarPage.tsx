import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAuth } from "../../context/AuthContext";
import { useMeetings } from "../../context/MeetingContext";


export const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [confirmed, setConfirmed] = useState<any[]>([]);

  const { user } = useAuth();
  const role = user?.role;

  const { addMeeting } = useMeetings();

  const addSlot = () => {
    setSlots([...slots, { date, status: "available" }]);

  
  };

  const sendRequest = () => {
  const newRequest = {
    date,
    status: "pending",
    requestedBy: role, // important
  };

  setRequests([...requests, newRequest]);
};

  const acceptRequest = (index: number) => {
    const req = requests[index];
    
    addMeeting(req);
    
    setConfirmed([...confirmed, req]);
    setRequests(requests.filter((_, i) => i !== index));
  };

  const declineRequest = (index: number) => {
  setRequests(requests.filter((_, i) => i !== index));
};

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">📅 Meeting Calendar</h2>

      <Calendar onChange={setDate} value={date} />

      {/* Entrepreneur */}
     <div className="flex gap-4">
  {role === "entrepreneur" && (
    <button
      onClick={addSlot}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
    >
      Add Availability Slot
    </button>
  )}

  {(role === "investor" || role === "entrepreneur") && (
    <button
      onClick={sendRequest}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
    >
      Request Meeting
    </button>
  )}
</div>

      {/* Requests (Entrepreneur only) */}
      {role === "entrepreneur" && (
  <div className="space-y-3">
    <h3 className="font-semibold text-lg">📩 Requests</h3>

    {/* EMPTY STATE */}
    {requests.length === 0 && (
      <p className="text-gray-500 text-sm">No requests yet</p>
    )}

    {/* REQUEST LIST */}
    {requests.map((r, i) => (
      <div
        key={i}
        className="bg-white border border-gray-200 rounded-lg p-3 flex justify-between items-center shadow-sm"
      >
        {/* DATE + WHO REQUESTED */}
        <div>
          <p className="text-sm font-medium">
            {r.date.toDateString()}
          </p>
          <p className="text-xs text-gray-500">
            Requested by: {r.requestedBy}
          </p>
        </div>

        {/* ACTION BUTTONS */}
        {/* ACTION BUTTONS */}
{r.requestedBy !== role && (
  <div className="flex gap-2">
    <button
      onClick={() => acceptRequest(i)}
      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition"
    >
      Accept
    </button>

    <button
      onClick={() => declineRequest(i)}
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
    >
      Decline
    </button>
  </div>
)}
      </div>
    ))}
  </div>
)}

      {/* Confirmed Meetings (BOTH) */}
      <div>
        <h3 className="font-semibold">Confirmed Meetings</h3>
        {confirmed.map((c, i) => (
          <div key={i}>{c.date.toDateString()}</div>
        ))}
      </div>
    </div>
  );
};