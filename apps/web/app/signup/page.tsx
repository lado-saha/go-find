import GoFindV2Logo from '@/app/ui/acme-logo';
import SignupForm from '../ui/signup-form';
 
export default function SignupPage() {
  return (
 <main className="flex items-center justify-center min-h-screen">
  <div className="relative mx-auto flex flex-col space-y-2.5 p-4 overflow-auto  w-full max-w-[1024px]">
    <div className="flex h-48 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
      <div className="w-70 text-white md:w-70 mb-2">
        <GoFindV2Logo />
      </div>
    </div>
    <SignupForm />
  </div>
</main>
);

}