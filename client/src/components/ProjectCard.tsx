import { Card, CardContent, CardHeader } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import { projectQueryOptions } from "@/queryOptions/projectQueryOptions";
import { formatDate } from "@/lib/utils";
import { Button } from "./ui/button";
import { Loader2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "./Progress";

type Project = {
  _id: string;
  title: string;
  description: string;
  tasks: { completed: boolean }[];
  createdAt: Date;
};
export default function ProjectCard() {
  const { data, isPending } = useQuery(projectQueryOptions());

  const sortedProjects = data
    ? [...data].sort(
        (a: Project, b: Project) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : [];

  if (isPending) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Loader2 className='w-10 h-10 stroke-3 text-primary animate-spin' />
      </div>
    );
  }
  return (
    <div className='grid grid-cols-3 gap-3'>
      {sortedProjects.map((project: Project) => {
        const totalTasks = project?.tasks.length;
        const completedTasks = project.tasks.filter(
          (task) => task.completed
        ).length;
        const completionPercentage =
          totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        return (
          <Card key={project._id}>
            <CardHeader className='font-semibold text-slate-600'>
              <Link
                to={`/projects/${project._id}`}
                className='hover:text-slate-900 transition-colors duration-300 ease-in-out'
              >
                {project.title}
              </Link>
              <div className='text-xs text-gray-400 font-normal'>
                {formatDate(project.createdAt)}
              </div>
            </CardHeader>
            <CardContent>
              <div className='mt-2 text-sm text-center'>
                {totalTasks === 0 ? (
                  <div>
                    <p className='mb-3 text-muted-foreground'>No task yet</p>
                    <Link to={`/projects/${project._id}`}>
                      <Button
                        size='icon'
                        className='rounded-full cursor-pointer'
                      >
                        <Plus className='w-4 h-4' />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className='flex flex-col gap-2'>
                    <p className='text-muted-foreground text-sm'>
                      {completedTasks} / {totalTasks} tasks completed
                    </p>
                    <Progress value={completionPercentage} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
