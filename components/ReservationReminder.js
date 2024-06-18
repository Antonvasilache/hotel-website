"use client";

import { format } from "date-fns";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useReservation } from "./ReservationContext";

function ReservationReminder() {
  //using Context API and a custom hook to retrieve the selected reservation dates on the room page
  const { range, resetRange } = useReservation();
  //if no dates are found, this component will not render anything
  if (!range.from || !range.to) return null;

  //if dates are stored in context, a fixed position component will be rendered on the rooms page
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 py-5 px-8 rounded-full bg-accent-500 text-primary-800 text  font-semibold shadow-xl shadow-slate-900 flex gap-8 items-center">
      <p>
        <span>👋</span> Don&apos;t forget to reserve your dates <br /> from{" "}
        {format(new Date(range.from), "MMM dd yyyy")} to{" "}
        {format(new Date(range.to), "MMM dd yyyy")}
      </p>
      <button
        className="rounded-full p-1 hover:bg-accent-600 transition-all"
        // clicking the x button will close the reminder and clear the selected dates
        onClick={resetRange}
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default ReservationReminder;
