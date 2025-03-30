import { signinFormSchema } from "@/schemas";
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
import { Link, useNavigate } from "react-router-dom";
import { signin } from "@/actions/auth";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function SigninForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof signinFormSchema>) {
    try {
      const data = await signin(values);
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      // Wait briefly for auth state to update
      await new Promise((resolve) => setTimeout(resolve, 100));

      toast.success("Signin successfully!");
      form.reset();
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/dashboard");
    } catch (err) {
      console.error("Error in signin", err);
      toast.error("An unexpected error occurred");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='shadcn@example.com'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={isSubmitting}
          className='w-full cursor-pointer'
        >
          {isSubmitting ? (
            <Loader2 className='w-4 h-4 animate-spin' />
          ) : (
            "Signin"
          )}
        </Button>
        <p className='text-sm text-muted-foreground'>
          Don't have any account ?
          <Link to='/signup' className='ml-2 text-primary hover:text-blue-700'>
            Signup
          </Link>
        </p>
      </form>
    </Form>
  );
}
