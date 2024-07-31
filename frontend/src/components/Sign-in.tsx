"use client";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";
import { LuLoader } from "react-icons/lu";
import { useRouter } from 'next/navigation';
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const router=useRouter()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const url = "https://taskhive-y97a.onrender.com/auth/signin";
      const raw = JSON.stringify(values);

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: raw,
          redirect: "follow"
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Something went wrong");
        }

        toast.success("Signed in successfully!");
        router.push("/")
        formik.resetForm();
        
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        ) : null}
      </div>
      <button
        type="submit"
        className="w-full bg-purple-700 text-white p-2 rounded mt-4 relative"
        disabled={loading}
      >
        {loading ? (
          <LuLoader className="animate-spin h-5 w-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
};

export default SignInForm;
