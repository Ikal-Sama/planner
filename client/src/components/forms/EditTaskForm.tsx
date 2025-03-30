import { editTaskSchema } from "@/schemas";
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
import { Loader2 } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTaskByIdOptions } from "@/queryOptions/projectQueryOptions";
import { useEffect } from "react";
import { editTask } from "@/actions/tasks";
import toast from "react-hot-toast";

export default function EditTaskForm({ taskId }: { taskId: string }) {
  const queryClient = useQueryClient();
  const { data } = useQuery(getTaskByIdOptions(taskId));

  const form = useForm<z.infer<typeof editTaskSchema>>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      text: data?.text || "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({ text: data.text });
    }
  }, [data, form.reset]);

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof editTaskSchema>) {
    await editTask(taskId, values)
      .then(async (data) => {
        if (data.success) {
          toast.success("Task updated successfully!");
          await queryClient.invalidateQueries({ queryKey: ["projects"] });
        }
        if (data.error) {
          toast.error(data.error);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
