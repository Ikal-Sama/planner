import { projectQueryOptions } from "@/queryOptions/projectQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "./ui/card";
import { activityQueryOptions } from "@/queryOptions/activityQueryOptions";
import { BicepsFlexed, Folder, ListTodo } from "lucide-react";

interface Task {
  id: string;
  name: string;
}

interface Project {
  id: string;
  name: string;
  tasks?: Task[];
}

export default function CardsDashboard() {
  const { data: projects } = useQuery(projectQueryOptions());
  const { data: activities } = useQuery(activityQueryOptions());

  const totalTasks = projects
    ? (projects as Project[]).reduce(
        (sum, project) => sum + (project.tasks?.length || 0),
        0
      )
    : 0;

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:gridcols-4 gap-3'>
      <Card className='p-5 bg-blue-300 text-white'>
        <CardHeader className='text-xl font-semibold uppercase flex items-center'>
          <Folder /> Projects
        </CardHeader>
        <CardContent>
          <span className='text-4xl font-bold'>
            {projects && projects.length}
          </span>
        </CardContent>
      </Card>
      <Card className='p-5 bg-green-300 text-white'>
        <CardHeader className='text-xl font-semibold uppercase flex items-center'>
          <BicepsFlexed /> Activities
        </CardHeader>
        <CardContent>
          <span className='text-4xl font-bold'>
            {activities && activities.length}
          </span>
        </CardContent>
      </Card>

      <Card className='p-5 bg-indigo-300 text-white'>
        <CardHeader className='text-xl font-semibold uppercase flex items-center'>
          <ListTodo /> Tasks
        </CardHeader>
        <CardContent>
          <span className='text-4xl font-bold'>{totalTasks}</span>
        </CardContent>
      </Card>
    </div>
  );
}
