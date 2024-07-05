import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  let data = await currentUser();
  console.log("data", data);

  return (
    <main>
      <UserButton afterSignOutUrl="/sign-in"></UserButton>
    </main>
  );
}
