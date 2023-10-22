import Login from "@/components/login/Login";
import {getServerSession} from 'next-auth';
import { useRouter } from 'next/navigation';
import { authConfig } from "./api/auth/[...nextauth]/route";
export default async function Home() {
   //verify if user autherized so not redner register form 
  const session =await getServerSession(authConfig);
  if (session) {
       //render what you want while user is logged
      const router = useRouter();
      router.push('/dashboard');
  }
  return (
    <div>
      <Login/>
    </div>
  )
}
