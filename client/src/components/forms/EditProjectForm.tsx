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
import { editProjectSchema } from "@/schemas";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProjectByIdOptions } from "@/queryOptions/projectQueryOptions";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { updateProject } from "@/actions/projects";
import toast from "react-hot-toast";
import { Textarea } from "../ui/textarea";

export default function EditProjectForm({ projectId }: { projectId: string }) {
  const queryClient = useQueryClient();
  const { data } = useQuery(getProjectByIdOptions(projectId));

  const form = useForm<z.infer<typeof editProjectSchema>>({
    resolver: zodResolver(editProjectSchema),
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
    },
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    if (data) {
      form.reset({ title: data.title, description: data.description });
    }
  }, [data, form.reset]);

  async function onSubmit(values: z.infer<typeof editProjectSchema>) {
    await updateProject(projectId, values)
      .then(async (data) => {
        if (data.error) {
          toast.error(data.error);
          return;
        }

        toast.success("Project updated successfully!");
        await queryClient.invalidateQueries({ queryKey: ["projects"] });
      })
      .catch((err) => {
        console.error("Error in updating project", err);
        toast.error("An unexpected error occurred");
      });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea className='h-20' {...field} />
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
