import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from 'next-auth/providers/github'
import { connectToDB } from "@utils/database";
import User from '@models/user';
const handler = NextAuth({
    providers: [GithubProvider({
        clientId: 'f490c31e37470e9f813c',
        clientSecret: 'aeba73c79b71c5bc7180eb1b380d7f342bf8144d',
    })],

    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();
            console.log(session)
            return true;

        },


        async SignIn({ profile }) {
            try {
                console.log("route re pasila");
                await connectToDB();
                console.log("Working")

                const userExist = await User.findOne({
                    email: profile.email
                })
                if (!userExist) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }

                return true;

            } catch (error) {

                console.log(error)
                return false;

            }

        }


    }

})

export { handler as GET, handler as POST }
