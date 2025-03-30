import SigninForm from "@/components/forms/SigninForm";

export default function Signin() {
  return (
    <div>
      <div className='text-center'>
        <h1 className='text-xl font-semibold'>Welcome Back</h1>
        <p className='mt-1 text-muted-foreground'>Sign in to your account</p>
      </div>

      <div className='py-8'>
        {/* Sign-in form */}
        <SigninForm />
      </div>
    </div>
  );
}
