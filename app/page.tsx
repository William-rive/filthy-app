import { auth } from "@/src/lib/auth";
import NavBar from "./components/navbar";
import HomePage from "./home/page";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <NavBar session={session} />
      <HomePage />
    </div>
  );
}
