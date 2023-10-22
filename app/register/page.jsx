import RegisterForm from '@/components/register-form/RegisterForm'
import {getServerSession} from 'next-auth';
import { useRouter } from 'next/navigation';
import { authConfig } from '../api/auth/[...nextauth]/route';
const Register =async () => {
    //verify if user autherized so not redner register form 
    const session =await getServerSession(authConfig);
    if (session) {
        //render what you want while user is logged
        const router = useRouter();
        router.push('/dashboard');
    }
    return (
    <div><RegisterForm/></div>
)
}

export default Register