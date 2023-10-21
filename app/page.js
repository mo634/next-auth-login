import Login from "@/components/login/Login";
import {getServerSession} from 'next-auth';
import { redirect } from 'next/navigation';
import { authConfig } from "./api/auth/[...nextauth]/route";
export default async function Home() {
   //verify if user autherized so not redner register form 
  const session =await getServerSession(authConfig);
  if (session) {
       //render what you want while user is logged
      redirect("/dashboard")}
  return (
    <div>
      <Login/>
    </div>
  )
}
