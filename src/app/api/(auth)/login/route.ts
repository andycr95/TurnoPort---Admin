import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import bcrypt from "bcrypt";
import config from "@/config/config";
import { NextResponse } from "next/server";
import prisma from "@/prisma/index";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  console.log(username, password);

  try {
    const user = await prisma.users.findUnique({ where: { login: username } });
    if (!user || !user.status) {
      return NextResponse.json(
        {
          status: false,
          error: "Unauthorized",
          message: "Creedenciales incorrectas",
        },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        {
          status: false,
          error: "Unauthorized",
          message: "Creedenciales incorrectas",
        },
        { status: 401 }
      );
    }
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        username,
      },
      config.api.secretKey
    );

    const cookie = serialize("auth-token", token, {
      httpOnly: true,
      secure: config.env === "production" ? true : false,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60,
    });

    return NextResponse.json({
      status: true,
      message: "Login exitoso",
      data: {
        token,
      },
      headers: {
        "Set-Cookie": cookie,
      },
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      {
        error: error.message,
        status: false,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
