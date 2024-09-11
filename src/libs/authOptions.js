import clientPromise from "@/libs/mongoConnect";
import * as mongoose from "mongoose";
import { User } from '@/models/User';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcrypt";

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        console.log("Received credentials:", { email, password });

        try {
          // Only connect if mongoose is not connected
          if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URL, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            });
            console.log("Database connected successfully");
          }
        } catch (error) {
          console.error("Database connection failed:", error);
          return null;
        }

        try {
          const user = await User.findOne({ email });
          console.log("User found in database:", user);

          if (!user) {
            console.log("No user found with this email");
            return null;
          }

          const passwordOk = await bcrypt.compare(password, user.password);
          console.log("Password comparison result:", passwordOk);

          if (passwordOk) {
            console.log("Authorization successful");
            return { id: user._id, email: user.email };
          } else {
            console.log("Password does not match");
            return null;
          }
        } catch (error) {
          console.error("Error during user lookup or password comparison:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    encryption: true,
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
