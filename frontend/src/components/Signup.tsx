import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';

const validationSchema = yup.object({
  fullname: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const SignUpForm = () => {
  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const url = 'http://localhost:8000/auth/signup';
      const raw = JSON.stringify(values);

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: raw,
        redirect: 'follow',
      };

      try {
        const response = await fetch(url, requestOptions);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Something went wrong');
        }

        toast.success('Signed up successfully!');
        formik.resetForm();
      } catch (error: any) {
        toast.error(error.message || 'Something went wrong');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Full Name</label>
        <input
          type="text"
          name="fullname"
          value={formik.values.fullname}
          onChange={formik.handleChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
        {formik.touched.fullname && formik.errors.fullname ? (
          <div className="text-red-500 text-sm">{formik.errors.fullname}</div>
        ) : null}
      </div>
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
        className="w-full bg-purple-700 text-white p-2 rounded mt-4"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
