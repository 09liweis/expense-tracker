import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { fetchToken, fetchUser, setAuthToken } from "../helpers";
import { LoginFormProps } from "../types";
import Loading from "./Loading";

export default function LoginForm({ setUser, setShowLogin }: LoginFormProps) {
  const [loginLoading, setLoginLoading] = useState(false);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    emailInput.current?.focus();
  }, []);

  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      eml: emailInput?.current?.value,
      pwd: passwordInput?.current?.value,
    };
    setLoginLoading(true);
    setMsg("");
    const response = await fetchToken(body);
    if (response.token) {
      setAuthToken(response.token);
      const userResponse = await fetchUser();
      setLoginLoading(false);
      if (userResponse?.user) {
        setUser(userResponse.user);
      }
    } else {
      setLoginLoading(false);
      setMsg(response.msg);
    }
  };

  return (
    <motion.section className="fixed w-full h-full flex justify-center items-center top-0 left-0 z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowLogin(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs"
      />

      <motion.form
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white w-full max-w-md mx-4 rounded-lg shadow-xl overflow-hidden"
        onSubmit={handleLogin}
      >
        {/* Header */}
        <div className="bg-slate-800 px-8 py-8">
          <h2 className="text-3xl font-bold text-white text-center">Sign In</h2>
        </div>

        {/* Form Content */}
        <div className="px-8 py-8 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="emal"
              className="block text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>
            <input
              id="emal"
              ref={emailInput}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-colors"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              ref={passwordInput}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-colors"
              placeholder="Enter your password"
              required
            />
          </div>

          {msg && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm font-medium">
              {msg}
            </div>
          )}

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full py-3 px-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loginLoading ? <Loading /> : "Sign In"}
          </button>

          {/* <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <a
            href="https://github.com/login/oauth/authorize?client_id=105591674a9b55dc8196"
            className="w-full py-3 px-4 flex items-center justify-center space-x-2 bg-gray-900 text-white rounded hover:bg-gray-800 focus:outline-hidden focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            <span>Continue with GitHub</span>
          </a> */}
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </motion.form>
    </motion.section>
  );
}
