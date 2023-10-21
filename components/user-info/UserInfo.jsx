"use client"
import React from "react";
import {signOut,useSession} from "next-auth/react";
const UserInfo = () => {
    //state 
    const {data : session}=useSession()
    return (
        <main className="main">
            <div className="flex flex-col gap-5 p-5 bg-zinc-300/10 shadow-xl">
                <p>Name:{session?.user?.name}</p>
                <p>Email:{session?.user?.email}</p>
                <button onClick={() => signOut()} className="main_btn">
                    Log Out
                </button>
            </div>
        </main>
    );
};

export default UserInfo;
