import { auth } from "@/app/_lib/auth";

export const metadata = {
  title: "Account",
  description: "Your Wild Oasis Account",
};

async function page() {
  const session = await auth();
  return <div>Welcome, {session.user.name}</div>;
}

export default page;
