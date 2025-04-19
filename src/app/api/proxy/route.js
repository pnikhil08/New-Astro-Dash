// import { NextResponse } from "next/server"

// // This is a proxy route to handle CSRF token issues
// export async function POST(request) {
//   try {
//     // Get the request body
//     const body = await request.json()

//     // First, get the CSRF token
//     const csrfResponse = await fetch("http://webdemo.dhwaniastro.co.in/sanctum/csrf-cookie", {
//       method: "GET",
//       credentials: "include",
//     })

//     // Extract cookies from the response
//     const cookies = csrfResponse.headers.getSetCookie()
//     let xsrfToken = ""

//     // Find the XSRF-TOKEN cookie
//     for (const cookie of cookies) {
//       if (cookie.startsWith("XSRF-TOKEN=")) {
//         const tokenPart = cookie.split(";")[0]
//         xsrfToken = decodeURIComponent(tokenPart.substring("XSRF-TOKEN=".length))
//         break
//       }
//     }

//     // Make the actual login request
//     const loginResponse = await fetch("http://webdemo.dhwaniastro.co.in/api/signin", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         "X-Requested-With": "XMLHttpRequest",
//         "X-XSRF-TOKEN": xsrfToken,
//         Origin: "http://localhost:3000",
//         Referer: "http://localhost:3000/",
//       },
//       body: JSON.stringify(body),
//       credentials: "include",
//     })

//     // Get the response data
//     const data = await loginResponse.json()

//     // Return the response
//     return NextResponse.json(data, { status: loginResponse.status })
//   } catch (error) {
//     console.error("Proxy error:", error)
//     return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
//   }
// }

