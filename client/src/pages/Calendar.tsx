import React, { useState } from "react";
import Calendar from "react-calendar";
import { useQuery } from "@tanstack/react-query";
import "react-calendar/dist/Calendar.css";
import { format, isToday } from "date-fns";
import { activityQueryOptions } from "@/queryOptions/activityQueryOptions";

interface Activity {
  _id: string;
  title: string;
  scheduledDate: string;
}

export default function ActivityCalendar() {
  const {
    data: activities,
    isLoading,
    error,
  } = useQuery(activityQueryOptions());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  if (isLoading)
    return <p className='text-center text-gray-500'>Loading activities...</p>;
  if (error)
    return (
      <p className='text-center text-red-500'>Error fetching activities</p>
    );

  // Function to check if an activity exists for a given date
  const tileContent = ({ date }: { date: Date }) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const hasActivity = activities?.some(
      (activity: Activity) =>
        format(new Date(activity.scheduledDate), "yyyy-MM-dd") === formattedDate
    );
    return hasActivity ? (
      <div className='w-2 h-2 bg-red-500 rounded-full mx-auto mt-1'></div>
    ) : null;
  };

  const tileClassName = ({ date }: { date: Date }) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const hasActivity = activities?.some(
      (activity: Activity) =>
        format(new Date(activity.scheduledDate), "yyyy-MM-dd") === formattedDate
    );

    // Ensure today's date stays blue, no matter what
    if (isToday(date)) return "bg-blue-500 text-white rounded-lg";

    // If the selected date has an activity, make it yellow
    if (
      selectedDate &&
      hasActivity &&
      format(selectedDate, "yyyy-MM-dd") === formattedDate
    ) {
      return "bg-yellow-300 rounded-lg";
    }

    return ""; // Default styling
  };

  return (
    <div className='flex gap-6 p-6 rounded-lg w-full mx-auto'>
      <div className='w-full'>
        <div className='p-4  w-full'>
          <h1 className='text-2xl font-semibold text-gray-800 mb-3'>
            Calendar
          </h1>
          <div style={{ width: "100%" }}>
            <Calendar
              onChange={(value) => setSelectedDate(value as Date)}
              value={selectedDate}
              tileContent={tileContent}
              tileClassName={tileClassName} // Apply class based on condition
              className='border-none w-[100%]'
            />
          </div>
        </div>
      </div>

      <div className='w-1/2 bg-gray-50 p-4 rounded-lg shadow-md'>
        <h2 className='text-lg font-medium text-gray-700 mb-2'>
          Activities on{" "}
          {selectedDate ? format(selectedDate, "yyyy-MM-dd") : "Select a Date"}
        </h2>
        <ul className='list-disc list-inside'>
          {activities
            ?.filter(
              (activity: Activity) =>
                selectedDate &&
                format(new Date(activity.scheduledDate), "yyyy-MM-dd") ===
                  format(selectedDate, "yyyy-MM-dd")
            )
            .map((activity: Activity) => (
              <li key={activity._id} className='text-gray-700'>
                {activity.title}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
