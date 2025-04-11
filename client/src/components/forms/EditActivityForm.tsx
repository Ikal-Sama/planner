import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { getActivityByIdQueryOptions } from "@/queryOptions/activityQueryOptions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { editActivitySchema } from "@/schemas";
import { Textarea } from "../ui/textarea";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { updateActivity } from "@/actions/activity";
import toast from "react-hot-toast";

export default function EditActivityForm({ itemId }: { itemId: string }) {
  const queryClient = useQueryClient();
  const { data } = useQuery(getActivityByIdQueryOptions(itemId));

  const form = useForm<z.infer<typeof editActivitySchema>>({
    resolver: zodResolver(editActivitySchema),
    defaultValues: {
      title: "",
      description: "",
      scheduledDate: undefined,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        description: data.description,
        scheduledDate: new Date(data.scheduledDate),
      });
    }
  }, [data, form.reset]);

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof editActivitySchema>) {
    await updateActivity(itemId, values)
      .then(async (data) => {
        if (data.error) {
          toast.error(data.error);
          return;
        }
        toast.success("Activity updated successfully!");
        await queryClient.invalidateQueries({ queryKey: ["activities"] });
      })
      .catch((err) => {
        console.error("Error in updating activity", err);
        toast.error("An unexpected error occurred");
      });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
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
        <FormField
          control={form.control}
          name='scheduledDate'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scheduled Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end'>
          <Button
            type='submit'
            disabled={isSubmitting}
            className='cursor-pointer'
          >
            {isSubmitting ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
