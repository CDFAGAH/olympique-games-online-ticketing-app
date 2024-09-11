import NextAuth from "next-auth";
import { authOptions } from "@/libs/authOptions"; // Adjust the path as needed
import { NextResponse } from 'next/server';

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
