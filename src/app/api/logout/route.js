export async function POST(req) {
  try {
    const accessToken = req.headers.get("authorization");

    const response = await fetch("https://webdemo.dhwaniastro.co.in/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken, 
      },
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500 }
    );
  }
}
