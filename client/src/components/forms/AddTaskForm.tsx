import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addTaskSchema } from "@/schemas";
import { Loader2 } from "lucide-react";
import { addTask } from "@/actions/tasks";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function AddTaskForm({ projectId }: { projectId: string }) {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof addTaskSchema>>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      text: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof addTaskSchema>) {
    const data = await addTask(values, projectId);
    if (data.error) {
      console.error(data.error);
      return;
    }

    toast.success("Task added successfully");
    await queryClient.invalidateQueries({ queryKey: ["projects"] });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='text'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end'>
          <Button
            type='submit'
            disabled={isSubmitting}
            className=' cursor-pointer'
          >
            {isSubmitting ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              "Add"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
