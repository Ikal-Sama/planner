import { signupFormSchema } from "@/schemas";
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
import { signup } from "@/actions/auth";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function SignupForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    await signup(values)
      .then((data) => {
        if (data.success) {
          toast.success("Signup successfully!");
          form.reset();
          navigate("/signin");
        }
        if (data.error) {
          toast.error(data.error);
        }
      })
      .catch((err) => {
        console.error("Error in signup", err);
        toast.error("An unexpected error occurred");
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name='confirm_password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
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
            "Signup"
          )}
        </Button>
        <p className='text-sm text-muted-foreground'>
          Already have an account ?
          <Link to='/signin' className='ml-2 text-primary hover:text-blue-700'>
            Signin
          </Link>
        </p>
      </form>
    </Form>
  );
}
