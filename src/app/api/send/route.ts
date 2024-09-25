import { NextResponse } from "next/server";
import { limiter } from "@/config/limiter";

import EmailTemplate from "@email/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type RequestData = {
  name: string;
  email: string;
  message: string;
  subject: string;
  botcheck: string;
};

export async function GET(request: Request) {
  const origin = request.headers.get("origin");

  const remaining = await limiter.removeTokens(1);
  //console.log(`remaining: ${remaining}`)

  if (remaining < 0) {
    return NextResponse.json(
      { error: "too many request" },
      {
        status: 429,
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Content-Type": "application/json",
        },
      }
    );
  }

  return NextResponse.json(
    { data: "ok" },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Content-Type": "application/json",
      },
    }
  );
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");

  const remaining = await limiter.removeTokens(1);
  console.log(`remaining: ${remaining}`);

  if (remaining < 0) {
    return NextResponse.json(
      { error: "too many request" },
      {
        status: 429,
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const data = (await request.json()) as RequestData;
    // console.log(data); //DEV

    // simple validation
    if (!data.name || !data.email || !data.message || !data.subject) {
      return NextResponse.json(
        { data: "bad request" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": origin || "*",
            "Content-Type": "application/json",
          },
        }
      );
    }

    // simple botcheck
    if (data.botcheck === "true") {
      return NextResponse.json(
        { data: "bad request" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": origin || "*",
            "Content-Type": "application/json",
          },
        }
      );
    }

    const { error } = await resend.emails.send({
      from: "juliuszlioba.com <writeme@juliuszlioba.com>",
      to: ["juliuszlioba@gmail.com"],
      subject: data.subject,
      react: EmailTemplate({
        name: data.name,
        email: data.email,
        message: data.message,
        subject: data.subject,
      }),
    });

    if (error) {
      return NextResponse.json(
        { data: "resend error", error: error },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": origin || "*",
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { data: "bad request", error: error },
      {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Content-Type": "application/json",
        },
      }
    );
  }

  return NextResponse.json(
    { data: "ok" },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Content-Type": "application/json",
      },
    }
  );
}
