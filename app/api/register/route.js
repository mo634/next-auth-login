import {connectMongodb} from "@/lib/mongodb";
import UserModel from "@/models/user-schema";
import {NextResponse} from "next/server";
import bcrypt from "bcryptjs";
export async function POST(req) {
    try {
        // get data from api

        const { name, email, password } = await req.json();
        
        

        //hashing the password

        const hashedPassword = await bcrypt.hash(password, 10);

        // put data in db

        await connectMongodb();

        //insert data in mongo db

        await UserModel.create({name, email, password: hashedPassword});

        return NextResponse.json({messg: "user registerd"}, {status: 201});
    } catch (err) {
        return NextResponse.json({messg: "an error occurred"}, {status: 500});
    }
}
