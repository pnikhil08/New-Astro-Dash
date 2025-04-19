import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Received reply request:", body);

   
    const token = request.headers.get("Authorization");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

   
    const { data, status } = await axios.post(
      "http://webdemo.dhwaniastro.co.in/api/delete-reply",
      body,
      {
        headers: {
          Authorization: token, 
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );

    console.log("Laravel API response:", data);
    return NextResponse.json(data, { status });
  } catch (error) {
    console.error("DELETE API error:", error);

    const errorMessage =
      error.response?.data?.message || "Failed to Delete reply";

    return NextResponse.json(
      { error: errorMessage, details: error.message },
      { status: error.response?.status || 500 }
    );
  }
}
