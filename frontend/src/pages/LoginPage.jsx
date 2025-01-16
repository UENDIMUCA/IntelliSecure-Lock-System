// filepath: /C:/Users/lucas/Desktop/Cours/Master IOT/projects/IntelliSecure-Lock-System/frontend/src/pages/LoginPage.jsx
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center p-6 md:p-10">
      <h1 className="text-3xl font-semibold text-center mb-4 mt-8">IntelliSecure</h1>
      <div className="flex flex-grow items-center justify-center w-full">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-lg">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}