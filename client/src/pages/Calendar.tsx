import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { activityQueryOptions } from "@/queryOptions/activityQueryOptions";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  if (isLoading)
    return <p className='text-center text-gray-500'>Loading activities...</p>;
  if (error)
    return (
      <p className='text-center text-red-500'>Error fetching activities</p>
    );

  // Function to check if an activity exists for a given date
  // Get the current date for comparison
  const today = new Date();

  // Function to check if an activity exists for a given date
  const hasActivity = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return (
      activities?.filter(
        (activity: Activity) =>
          // Filter out past activities
          new Date(activity.scheduledDate) >= today &&
          format(new Date(activity.scheduledDate), "yyyy-MM-dd") ===
            formattedDate
      ).length > 0
    );
  };

  const dateContent = (date: Date) => {
    if (hasActivity(date)) {
      return (
        <div className='w-2 h-2 bg-red-500 rounded-full mx-auto mt-1'></div>
      );
    }
    return null;
  };

  return (
    <div className='flex flex-col md:flex-row gap-6 p-6 rounded-lg w-full mx-auto'>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='text-2xl font-semibold text-gray-800'>
            Calendar
          </CardTitle>
        </CardHeader>
        <CardContent className='w-full'>
          <Calendar
            mode='single'
            selected={selectedDate}
            onSelect={setSelectedDate}
            className='rounded-md flex justify-center w-full'
            components={{
              DayContent: (props: { date: Date }) => {
                // Check if the day is Sunday (0)
                const isSunday = props.date.getDay() === 0;
                return (
                  <div className={isSunday ? "text-red-500" : ""}>
                    {props.date.getDate()}
                    {dateContent(props.date)}
                  </div>
                );
              },
            }}
            modifiers={{
              hasActivity:
                activities
                  ?.filter(
                    (activity: Activity) =>
                      // Only include activities that are not in the past
                      new Date(activity.scheduledDate) >= today
                  )
                  .map(
                    (activity: Activity) => new Date(activity.scheduledDate)
                  ) || [],
            }}
            modifiersClassNames={{
              hasActivity:
                "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-red-500 after:rounded-full",
              today: "bg-blue-500 text-white rounded-full",
            }}
          />
        </CardContent>
      </Card>

      <Card className='w-full md:w-1/2'>
        <CardHeader>
          <CardTitle className='text-lg font-medium text-gray-700 text-center'>
            Activities on{" "}
            {selectedDate ? format(selectedDate, "yyyy-MM-dd") : "-/-/-"}
          </CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}
