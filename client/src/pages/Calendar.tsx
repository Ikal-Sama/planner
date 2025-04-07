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
  const hasActivity = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return activities?.some(
      (activity: Activity) =>
        format(new Date(activity.scheduledDate), "yyyy-MM-dd") === formattedDate
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

  // const dateClassName = (date: Date) => {
  //   const formattedDate = format(date, "yyyy-MM-dd");
  //   const activityExists = hasActivity(date);

  //   // Today's date styling
  //   if (isToday(date)) return "bg-blue-500 text-white rounded-full";

  //   // Selected date with activity styling
  //   if (
  //     selectedDate &&
  //     activityExists &&
  //     format(selectedDate, "yyyy-MM-dd") === formattedDate
  //   ) {
  //     return "bg-yellow-300 rounded-full";
  //   }

  //   return "";
  // };

  return (
    <div className='flex flex-col md:flex-row gap-6 p-6 rounded-lg w-full mx-auto'>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='text-2xl font-semibold text-gray-800'>
            Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode='single'
            selected={selectedDate}
            onSelect={setSelectedDate}
            className='rounded-md flex justify-center w-full'
            components={{
              DayContent: (props) => (
                <div className='relative'>
                  {props.date.getDate()}
                  {dateContent(props.date)}
                </div>
              ),
            }}
            modifiers={{
              hasActivity:
                activities?.map(
                  (activity: Activity) => new Date(activity.scheduledDate)
                ) || [],
            }}
            modifiersClassNames={{
              hasActivity: "bg-yellow-300 rounded-full",
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
