import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { users } from "../../../../lib/schema";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists using Drizzle
    const [existingUser] = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.email, email),
          eq(users.name, name)
        )
      )
      .limit(1);

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email or username already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserId = crypto.randomUUID();

    // Create the user in the database using Drizzle
    await db.insert(users).values({
      id: newUserId,
      name: name,
      email: email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User registered successfully", userId: newUserId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
