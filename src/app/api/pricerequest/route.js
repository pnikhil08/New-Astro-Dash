import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const body = await request.json();

    const accessToken = request.headers.get("authorization");

    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, status } = await axios.post(
      "https://webdemo.dhwaniastro.co.in/api/astro-price/store",
      body,
      
      {
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
    {console.log("Payload sent to Laravel:", body)}
    return NextResponse.json(data, { status });
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to submit price request";

    return NextResponse.json(
      { error: errorMessage, details: error.message },
      { status: error.response?.status || 500 }
    );
  }
}
