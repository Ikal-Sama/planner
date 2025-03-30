import DialogContainer from "@/components/DialogContainer";
import AddTaskForm from "@/components/forms/AddTaskForm";
import { Button } from "@/components/ui/button";
import { getProjectByIdOptions } from "@/queryOptions/projectQueryOptions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  CircleHelp,
  Edit,
  Ellipsis,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteTask, toggleCompleteTask } from "@/actions/tasks";
import toast from "react-hot-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditTaskForm from "@/components/forms/EditTaskForm";
import EditProjectForm from "@/components/forms/EditProjectForm";
import { deleteProject } from "@/actions/projects";

export default function Project() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: project, isPending } = useQuery(
    getProjectByIdOptions(id || "")
  );

  console.log(project);

  if (isPending) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Loader2 className='w-10 h-10 stroke-3 text-primary animate-spin' />
      </div>
    );
  }

  const totalTasks = project?.tasks.length || 0;
  const completedTasks =
    project?.tasks.filter((task) => task.completed).length || 0;
  const completedPercentage =
    totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : 0;

  const handleToggleComplete = async (id: string) => {
    await toggleCompleteTask(id)
      .then(async (data) => {
        if (data.success) {
          toast.success("Task completed!");
          await queryClient.invalidateQueries({ queryKey: ["projects"] });
        } else {
          toast.error("Failed to complete task!");
        }
      })
      .catch((err) => {
        console.log("Error in toggling completed!", err);
        toast.error(err.message);
      });
  };
  const handleDeleteTask = async (id: string) => {
    try {
      const data = await deleteTask(id);
      if (data.success) {
        toast.success("Task deleted successfully");
        await queryClient.invalidateQueries({ queryKey: ["projects"] });
      } else {
        toast.error("Failed to delete task!");
      }
    } catch (error) {
      console.log("Error in toggling completed!", error);
      toast.error("Failed to toggle completed task!");
    }
  };

  const handleDeletePoject = async (id: string) => {
    await deleteProject(id)
      .then(async (data) => {
        if (data.success) {
          toast.success("Project deleted successfully");
          navigate("/projects");
        }
      })
      .catch((err) => {
        console.error("Error in deleting project!", err);
        toast.error("Failed to delete project!");
      });
  };

  return (
    <div>
      <Link
        to='/projects'
        className='flex gap-2 text-sm items-center text-slate-700 hover:text-slate-900 transition-colors duration-300 ease-in-out mb-4'
      >
        <ArrowLeft className='w-5 h-5' />
        Go Back
      </Link>
      <div className='flex justify-center items-center w-full'>
        {project && (
          <div key={project._id} className='w-full'>
            <div className='text-center'>
              <h1 className='text-3xl font-bold'>{project.title}</h1>
              <p className='text-lg text-muted-foreground mt-2'>
                {project.description}
              </p>
            </div>

            {/* Tasks here */}
            <div className='my-5 flex flex-col items-center justify-center'>
              <div className='my-5 flex justify-center'>
                <DialogContainer
                  triggerButton={
                    <Button size='sm' className='cursor-pointer'>
                      <Plus /> Add Task
                    </Button>
                  }
                  title='Add Task'
                >
                  <AddTaskForm projectId={project._id} />
                </DialogContainer>
              </div>
              {project.tasks.length === 0 ? (
                <div>
                  <h2>No task yet!</h2>
                </div>
              ) : (
                <div className='w-1/2  h-[20rem] overflow-y-auto'>
                  {project.tasks.map((task) => (
                    <div
                      key={task._id}
                      className='my-2 grid grid-cols-3 p-2 border rounded-sm '
                    >
                      <div>
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => handleToggleComplete(task._id)}
                        />
                      </div>
                      <div className='w-full'>{task.text}</div>
                      <div className='flex justify-end items-center '>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div className='hover:bg-accent p-1 rounded-sm cursor-pointer'>
                              <Ellipsis className='w-4 h-4 text-muted-foreground' />
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DialogContainer
                              triggerButton={
                                <div className='group flex items-center gap-2 p-2 hover:bg-slate-100 transition-colors duration-300 ease-in-out cursor-pointer'>
                                  <Edit className='w-4 h-4 text-blue-400 group-hover:text-blue-500' />
                                  <span className='text-blue-400 group-hover:text-blue-500 text-sm'>
                                    Edit
                                  </span>
                                </div>
                              }
                              title='Edit Task'
                            >
                              <EditTaskForm taskId={task._id} />
                            </DialogContainer>
                            <DropdownMenuItem
                              onClick={() => handleDeleteTask(task._id)}
                              className='group transition-colors duration-300 ease-in-out cursor-pointer'
                            >
                              <Trash2 className='text-red-400 group-hover:text-red-500' />
                              <span className='text-red-400 group-hover:text-red-500'>
                                Delete
                              </span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* DATA */}
            <div className='grid grid-cols-3 w-full items-center justify-center'>
              <div className='flex justify-center flex-col gap-3 items-center'>
                <span className='text-2xl font-semibold text-blue-800'>
                  {completedPercentage}%
                </span>
                <h2 className='text-muted-foreground'>
                  Completed Tasks Percentage
                </h2>
              </div>
              <div className='flex justify-center flex-col gap-3 items-center'>
                <span className='text-2xl font-semibold text-blue-800'>
                  {totalTasks}
                </span>
                <h2 className='text-muted-foreground'>Total Tasks</h2>
              </div>
              <div className='flex justify-center flex-col gap-3 items-center'>
                <span className='text-2xl font-semibold text-blue-800'>
                  {totalTasks - completedTasks}
                </span>
                <h2 className='text-muted-foreground'>Ongoing Tasks</h2>
              </div>
            </div>

            {/* Options */}
            <div className='mt-20 max-w-lg  px-14'>
              <p className='text-lg font-semibold text-slate-900'>
                Project Settings
              </p>
              <span className='text-muted-foreground text-sm'>
                Warning - The buttons update and delete will make a changes or
                remove the project permanently{" "}
              </span>

              <div className='mt-5 flex  gap-2 w-20'>
                <DialogContainer
                  triggerButton={
                    <Button className='cursor-pointer'>Update</Button>
                  }
                  title='Edit Project'
                >
                  <EditProjectForm projectId={project._id} />
                </DialogContainer>

                <DialogContainer
                  triggerButton={
                    <Button variant='destructive' className='cursor-pointer'>
                      Delete
                    </Button>
                  }
                  title=''
                >
                  <div className='mt-5 flex flex-col items-center gap-3 justify-center p-0'>
                    <h1 className='text-lg'>Are you Sure ?</h1>
                    <CircleHelp className='w-14 h-14 text-red-500' />
                    <Button
                      className='cursor-pointer'
                      variant='destructive'
                      onClick={() => handleDeletePoject(project._id)}
                    >
                      Confirm
                    </Button>
                  </div>
                </DialogContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
