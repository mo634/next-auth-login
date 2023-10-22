"use client";

import Link from "next/link";
import "../login/style.css";
import {useState} from "react";
import {useRouter} from "next/navigation";
const RegisterForm = () => {
    // state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    //func
    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        //check all field filled
        if (!name || !email || !password) {
            setError("all field required ");
            setIsLoading(false);

            return;
        } else {
            setError("");
        }

        // Post form data to the api

        try {
            // check if email is already exist in DB

            const resUserExists = await fetch("api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email}),
            });

            // get client response if user is null (not exist email )or not

            const {user} = await resUserExists.json();

            if (user) {
                setError("user already exists");
                return;
            }

            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            // check is respo is ok and data send succes
            if (res.ok) {
                setEmail("");
                setName("");
                setPassword("");

                const form = e.target;
                form.reset();
                router.push("/");
            } else {
                console.log("error while sending info");
            }
        } catch (error) {
            console.log("error while register");
        } finally {
            setIsLoading(false);
        }
    };

    //render the compoent
    return (
        <main className="main">
            <div className="login-wrapper">
                {/* header  */}
                <h1 className="  font-bold text-4xl ">Enter Details</h1>

                {/* form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter You Name" />
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Email" />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" />
                    {/* register btn or loading sniper */}
                    {isLoading ? (
                        <span className="loader"></span>
                    ) : (
                        <a href="#" className="a-liquid">
                            <button>Register</button>
                            <div className="liquid"></div>
                        </a>
                    )}
                </form>

                {/* err mesg */}
                {error && <p className=" bg-[#f44336] w-fit p-2 rounded-md text-white">{error}</p>}

                {/* login Link */}
                <Link href="/" className=" text-right">
                    Already have an account ?{" "}
                    <span className=" underline duration-300 hover:text-[#0079ff]">Login</span>{" "}
                </Link>
            </div>
        </main>
    );
};

export default RegisterForm;
