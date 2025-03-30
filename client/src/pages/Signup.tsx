import SignupForm from "@/components/forms/SignupForm";

export default function Signup() {
  return (
    <div>
      <div className='text-center'>
        <h1 className='text-xl font-semibold'>Create an account</h1>
        <p className='mt-1 text-muted-foreground'>
          Sign up to a create new account
        </p>
      </div>

      <div className='mt-10'>
        {/* Sign-up form */}
        <SignupForm />
      </div>
    </div>
  );
}
