"use client";

const { createContext, useContext, useState } = require("react");

const ReservationContext = createContext();

const initialRangeState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialRangeState);

  const resetRange = () => setRange(initialRangeState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

export default ReservationProvider;

export function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}
