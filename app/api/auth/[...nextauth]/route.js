// import req 
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { async, connectMongodb } from './../../../../lib/mongodb';
import UserModel from '@/models/user-schema';
import bcrypt from "bcryptjs";

// create auth config

export const authConfig = {
    //place to put the log in info 
    providers: [
        CredentialsProvider({
            id: 'credentials',
            //we need this name when use sinin func
            name: "credentials",
            credentials: {},
            
            //create auth func to verify user 
            async authorize(credentials) {
                //start compare data from credentials and if exist in db 
                const { email, password } = credentials
                
                try {
                    await connectMongodb()

                    //verify email 
                    const user = await UserModel.findOne({ email })

                    if (!user) {
                        return null;
                    }

                    //verify password
                    //note when found the email in the 1st check it will return whole object (email,password)
                    //and store it inside the user 
                    
                    const passwordMatch = await bcrypt.compare(password, user.password)
                    
                    if (!passwordMatch) {
                        return null
                    }

                    return user; 
                } catch (error) {
                    console.log(error)
                }
            }
        })

    ],

    // resp for make sys remmeber the auth users
    session: {
        strategy:"jwt"
    },

    // add secret string for encrypt info 
    secret: process.env.NEXTAUTH_SECRET,
    
    //select wich route to authenticate

    pages: {
        signIn:"/"
    }
}


// create the handler that containt the config

const handler = NextAuth(authConfig)

export {handler as GET ,handler as POST}
