"use client";
import {useState} from "react";
import "./style.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {signIn} from 'next-auth/react';
const Login = () => {
    //state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    //func
    const hanldeSubmit =async (e) => {
        e.preventDefault();
        
        setIsLoading(true);
        //check all field filled
        if (!email || !password) {
            setError("all field required ");
            setIsLoading(false);
            return;
        } else {
            setError("");
        }

        //verify singin info 
        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect:false,
            })

            if (res.error) {
                setError("Invalid Data ")
                return;
            }

            router.replace("dashboard")
            
        }
        catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <main className="main ">
            <div className="login-wrapper">
                {/* header  */}
                <h1 className="  font-bold text-4xl ">Enter Details</h1>

                {/* form */}
                <form onSubmit={hanldeSubmit} className="flex flex-col gap-3">
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Email" />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" />
                    {/* register btn or loading sniper */}
                    {isLoading ?<span className="loader"></span> : <button className="main_btn">Login</button>}
                </form>

                {/* err mesg */}
                {error ? <p className=" bg-[#f44336] w-fit p-2 rounded-md text-white">{error}</p> : null}

                {/* Register Link */}
                <Link href="/register" className=" text-right">
                    Don't have an accout ?{" "}
                    <span className=" underline duration-300 hover:text-[#0079ff]">Register</span>{" "}
                </Link>
            </div>
        </main>
    );
};

export default Login;
