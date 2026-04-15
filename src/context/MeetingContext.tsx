import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

interface Meeting {
  date: Date;
  requestedBy: string;
  status: "pending" | "confirmed";
}

interface Meeting {
  date: Date;
  time: string; // ✅ ADD THIS
  requestedBy: string;
  status: "pending" | "confirmed" | "rejected";
}

interface MeetingContextType {
  meetings: Meeting[];
  addMeeting: (meeting: Meeting) => void;
  updateMeetingStatus: (req: any, status: string) => void;
}

const MeetingContext = createContext<MeetingContextType | undefined>(undefined);

export const MeetingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const [meetings, setMeetings] = useState<Meeting[]>(() => {
  const saved = localStorage.getItem("meetings");
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem("meetings", JSON.stringify(meetings));
}, [meetings]);

  const addMeeting = (meeting: Meeting) => {
    setMeetings(prev => [...prev, meeting]);
  };

  const updateMeetingStatus = (req: any, newStatus: string) => {
  setMeetings((prev: any[]) =>
    prev.map((m) =>
      new Date(m.date).toDateString() === new Date(req.date).toDateString() &&
      m.time === req.time &&
      m.requestedBy === req.requestedBy
        ? { ...m, status: newStatus }
        : m
    )
  );
};

  return (
    <MeetingContext.Provider value={{ meetings, addMeeting, updateMeetingStatus }}>
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeetings = () => {
  const context = useContext(MeetingContext);
  if (!context) {
    throw new Error("useMeetings must be used inside MeetingProvider");
  }
  return context;
};