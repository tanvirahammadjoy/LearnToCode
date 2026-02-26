import Link from "next/link";
import { useState } from "react";

export default function NextAuthForm() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(values);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-300 p-2 rounded-lg"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border border-gray-300 p-2 rounded-lg"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <Link href="/login">
            <a className="text-blue-500 hover:text-blue-700">
              Already have an account?
            </a>
          </Link>
        </div>
      </form>
      ;
    </>
  );
}
