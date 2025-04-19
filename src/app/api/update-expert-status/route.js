import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const body = await request.json();
    const token = request.headers.get("Authorization");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { availability, type } = body;

    if (!type || typeof availability === "undefined") {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const payload = {
      availability: availability,
      type: type
    };

    const { data, status } = await axios.post(
      "http://webdemo.dhwaniastro.co.in/api/expert/update-status",
      payload,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );

    return NextResponse.json(data, { status });
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to update expert status";

    return NextResponse.json(
      { error: errorMessage, details: error.message },
      { status: error.response?.status || 500 }
    );
  }
}
