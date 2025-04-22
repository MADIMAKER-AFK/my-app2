import type { Route } from "../+types/login";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - WM BlackCode" },
    { name: "description", content: "Login to WM BlackCode platform" },
  ];
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login attempt:", { username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
      <div className="bg-black w-96 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <img 
              src="/logo-light.svg" 
              alt="BlackCode Logo" 
              className="w-48 h-auto"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div className="mb-6">
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-yellow-500 text-black py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}