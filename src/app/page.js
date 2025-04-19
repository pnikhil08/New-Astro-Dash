"use client";

import styles from "@/app/login/login.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/app/redux/slice/authSlice";

export default function LoginForm() {
  const [mobile, setMobile] = useState("9319490825");
  const [password, setPassword] = useState("123456789");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch(); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile, password }),
        // credentials: "include",
      });

      let data;
      const responseText = await response.text();
      try {
        data = JSON.parse(responseText);
      } catch {
        data = { message: responseText };
      }
      console.log("Login API Response:", data); // Debugging
      // dispatch(setCredentials({ accessToken: access_token, user }));

      if (response.ok && data.access_token) {
        dispatch(setCredentials({ accessToken: data.access_token, user: data.user }));
        localStorage.setItem("accessToken", data.access_token); 
        localStorage.setItem("USER",data.user.id );
        console.log("Stored Token:", localStorage.getItem("accessToken")); 
        console.log("USER ID:", localStorage.getItem("USER"));
        alert("Login successful!");
        router.push("/dashboard");
      } else {
        setError(data.message || "Invalid credentials.");
      }
    } catch (error) {
      setError("Login error: Unable to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className={styles.nboby}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <div className={styles.mobileHeader}>
              <div className={styles.logo}>
                <Image
                  src="/logo.png"
                  alt="loading..."
                  width={130}
                  height={50}
                  className={styles.logoImage}
                />
              </div>
            </div>
            <nav className={styles.navLinks}>
              <Link href="#contact" className={styles.profile}>
                <Image
                  src="/user2.png"
                  width={35}
                  height={35}
                  alt=""
                  className={styles.profileImage}
                />
                <h5 className={styles.signInText}>SignIN</h5>
              </Link>
            </nav>
          </div>
        </header>

        {/* Login Form */}
        <div className={styles.loginContainer}>
          <div className={styles.loginBox}>
            <h2>Login</h2>
            <span>Enter your credentials.</span>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="mobile">Phone Number:</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={mobile}
              placeholder="Enter phone number"
              required
              onChange={(e) => setMobile(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}{" "}
            {/* ✅ Show error properly */}
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerBox}>
            <p className={styles.footerText}>
              Copyright &copy; 2023. Made with ❤️ by Dhwani Astro.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
