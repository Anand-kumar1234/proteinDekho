import LoginForm from "../features/auth/components/LoginForm";

function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        {/* Page Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-500">
            Login to your ProteinDekho account
          </p>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-green-600 hover:text-green-700"
          >
            Create Account
          </a>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;