import React, { createContext, useContext, useState } from "react";

interface Meeting {
  date: Date;
  requestedBy: string;
}

interface MeetingContextType {
  confirmedMeetings: Meeting[];
  addMeeting: (meeting: Meeting) => void;
}

const MeetingContext = createContext<MeetingContextType | undefined>(undefined);

export const MeetingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [confirmedMeetings, setConfirmedMeetings] = useState<Meeting[]>([]);

  const addMeeting = (meeting: Meeting) => {
    setConfirmedMeetings(prev => [...prev, meeting]);
  };

  return (
    <MeetingContext.Provider value={{ confirmedMeetings, addMeeting }}>
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