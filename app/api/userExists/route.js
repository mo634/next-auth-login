import { connectMongodb } from "@/lib/mongodb";
import UserModel from "@/models/user-schema";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // connect db 
        await connectMongodb()

        // fetch email from register page

        const { email } = await req.json()

        //compare email if exsis in data set

        const user =await UserModel.findOne({ email }).select("_id") 

        // return user to clien to can use in condition  if null or not 
        return NextResponse.json({user})


    } catch (error) {
        console.log(error)
    }
}