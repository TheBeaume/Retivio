import { Link } from "react-router-dom";

export default function ProjectSubmitted() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="max-w-2xl rounded-3xl bg-white p-10 shadow-xl text-center">

        <div className="text-6xl">🎉</div>

        <h1 className="mt-6 text-4xl font-bold">
          Project Brief Received
        </h1>

        <p className="mt-6 text-gray-600 leading-8">
          Thank you for sharing your project details.
          Your information has been received successfully.
        </p>

        <div className="mt-10 rounded-2xl bg-purple-50 p-6">

          <h2 className="text-2xl font-bold">
            Next Step
          </h2>

          <p className="mt-4 text-gray-700">
            Choose your payment method below to start your project.
          </p>

        </div>

        <div className="mt-10 grid gap-5">

          <a
            href="https://gumroad.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-purple-700 py-4 font-bold text-white"
          >
            Buy Template Only
          </a>

          <a
            href="https://wa.me/YOURNUMBER"
            className="rounded-2xl border-2 border-purple-700 py-4 font-bold text-purple-700"
          >
            Contact for Setup Package
          </a>

        </div>

        <Link
          to="/"
          className="mt-8 inline-block text-purple-700 font-semibold"
        >
          ← Back to Home
        </Link>

      </div>

    </div>
  );
}
