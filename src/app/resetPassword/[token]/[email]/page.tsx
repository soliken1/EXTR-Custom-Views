"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";

const ResetPasswordPage = () => {
  const { token, email } = useParams();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const resetRoute = `https://extr-fri730-704ba95d817c.herokuapp.com/api/password/reset/${token}`;
  const decodedEmail =
    typeof email === "string" ? decodeURIComponent(email) : "";

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      setMessage("");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setMessage("");
      return;
    }

    try {
      const response = await fetch(resetRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: decodedEmail,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          data.message || "Password reset successfully! You May Close This Page"
        );
        setError("");
      } else {
        setError(data.message || "Something Went Wrong, Please Try Again");
        setMessage("");
      }
    } catch {
      setError("Please and Try To Submit Again");
      setMessage("");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded px-8 pt-6 pb-8"
      >
        <h2 className="text-2xl font-bold mb-6">Reset Password</h2>

        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={decodedEmail}
            required
            disabled
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            min={6}
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="passwordConfirmation"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="passwordConfirmation"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
            min={6}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
