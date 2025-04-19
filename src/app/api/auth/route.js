
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Received login request with body:", body);

    // Send login request to Laravel API
    const { data, status } = await axios.post(
      "http://webdemo.dhwaniastro.co.in/api/signin",
      {
        ...body,
        device_name: "web",
        remember: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );

    console.log("Laravel API response:", data);

    return NextResponse.json(data, { status });
  } catch (error) {
    console.error("Auth API error:", error);

    // Handle Axios errors
    const errorMessage =
      error.response?.data?.message || "Failed to process request";

    return NextResponse.json(
      { error: errorMessage, details: error.message },
      { status: error.response?.status || 500 }
    );
  }
}



