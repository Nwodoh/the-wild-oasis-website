import SignInButton from "@/app/_components/SignInButton";
import { SignInAction } from "@/app/_lib/actions";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>
      <form action={SignInAction}>
        <SignInButton />
      </form>
    </div>
  );
}
