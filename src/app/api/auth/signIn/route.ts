import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // 1. Find user in the database using Drizzle
    const [user] = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.email, email),
          eq(users.name, email)
        )
      )
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { message: "No user found with this email" },
        { status: 404 }
      );
    }

    // 2. Check if the password matches (drizzle uses lowercase users.password)
    if (!user.password) {
      return NextResponse.json(
        { message: "This account does not have a password set" },
        { status: 400 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 401 }
      );
    }

    // 3. Return success (Note: This does not set NextAuth cookies!)
    return NextResponse.json(
      { 
        message: "Login successful!", 
        user: { id: user.id, email: user.email, name: user.name } 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("SignIn error:", error);
    return NextResponse.json(
      { message: "An error occurred during sign in" },
      { status: 500 }
    );
  }
}
