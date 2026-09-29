import RegisterForm from "../features/auth/components/RegisterForm";

function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        {/* Page Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="mt-2 text-gray-500">
            Join ProteinDekho
          </p>
        </div>

        {/* Signup Form */}
        <RegisterForm />

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-green-600 hover:text-green-700"
          >
            Login
          </a>
        </p>

      </div>
    </div>
  );
}

export default RegisterPage;