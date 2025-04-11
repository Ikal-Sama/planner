import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddProjectForm from "@/components/forms/AddProjectForm";
import DialogContainer from "@/components/DialogContainer";
import { useQuery } from "@tanstack/react-query";
import { projectQueryOptions } from "@/queryOptions/projectQueryOptions";
import { formatDataNumeric } from "@/lib/utils";

type Project = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  tasks: Tasks[];
};

type Tasks = {
  _id: string;
  text: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function Projects() {
  const { data: projects } = useQuery(projectQueryOptions());

  // Calculate total percentage of completed tasks
  const calculateTotalCompletion = () => {
    if (!projects || projects.length === 0) return 0;
    const allTasks = projects.flatMap((project: Project) => project.tasks);
    const completedTasks = allTasks.filter(
      (task: Tasks) => task.completed
    ).length;
    const totalTasks = allTasks.length;
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };

  // Get recent completed tasks
  const getRecentCompletedTasks = () => {
    if (!projects) return [];
    return projects
      .flatMap((project: Project) => project.tasks)
      .filter((task: Tasks) => task.completed)
      .slice(-5) // Get last 5 completed tasks
      .reverse();
  };

  return (
    <div className='flex flex-col w-full h-full gap-3'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Projects</h1>
        <DialogContainer
          triggerButton={
            <Button className='cursor-pointer'>
              <Plus />
            </Button>
          }
          title='Add Project'
        >
          <AddProjectForm />
        </DialogContainer>
      </div>
      <div className='flex flex-col md:flex-col lg:flex-row gap-3 items-center h-full w-full'>
        <div className='w-full h-full '>
          <ProjectCard />
        </div>
        <div className='w-full lg:w-1/3 flex flex-row lg:flex-col gap-3 h-full'>
          <div className='bg-blue-50 rounded-md h-64 p-3 shadow w-full'>
            <h2 className=' font-semibold'>Total Completion</h2>
            {/* <p className='text-2xl font-bold'>{calculateTotalCompletion()}%</p> */}
            <div className='flex justify-center items-center mt-5'>
              <div
                className='radial-progress text-primary'
                style={
                  {
                    "--value": calculateTotalCompletion(),
                  } as React.CSSProperties
                }
                aria-valuenow={70}
                role='progressbar'
              >
                {calculateTotalCompletion()}%
              </div>
            </div>
          </div>
          <div className='bg-slate-50 rounded-md shadow h-full p-3 w-full'>
            <h2 className=' font-semibold mb-2'>Recent Completed Tasks</h2>
            <ul className='mt-5'>
              {getRecentCompletedTasks().map((task: Tasks) => (
                <li
                  key={task._id}
                  className='border-b border-slate-300 pb-1 mb-1 flex justify-between items-center py-2'
                >
                  <span className='text-sm'>{task.text}</span>
                  <span className='text-xs'>
                    {formatDataNumeric(new Date(task.createdAt))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
