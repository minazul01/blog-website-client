import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError(true);
      setMessage("Please enter a valid email address.");
      return;
    }
    setMessage("");

    setError(false);
    Swal.fire({
      title: "Submited!",
      icon: "success",
      draggable: true,
    });

    // Clear input
    setEmail("");

    // TODO: এখানে API কল বা Firebase integration করবেন
  };

  return (
    <section className="text-black py-12 px-4 my-10">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">
          Stay Updated with the Latest Tech Trends
        </h2>
        <p className="mb-6">
          Subscribe to our newsletter and never miss an update on React, AI, and
          more!
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            required
            className="w-full sm:flex-1 px-4 py-3 rounded-md text-gray-900 border-2 border-gray-500 focus:outline-blue-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-md font-semibold transition cursor-pointer"
          >
            Subscribe
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 font-medium ${
              error ? "text-red-500" : "text-green-400"
            }`}
          >
            {message}
          </p>
        )}
        <p className="mt-4 text-xs text-gray-400">
          We respect your privacy. No spam, ever.
        </p>
      </div>
    </section>
  );
}
