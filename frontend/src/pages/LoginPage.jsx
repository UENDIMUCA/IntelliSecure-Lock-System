import React from "react";
import { LoginForm } from "@/components/login-form";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm className="w-full max-w-md" />
    </div>
  );
};

export default LoginPage; // Add this line
