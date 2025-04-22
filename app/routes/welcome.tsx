import React, { useState } from "react";
import { useNavigate } from "react-router";
import wmblackcodeLong from "../welcome/wmblackcodeLong.png";
import background from "../welcome/background.svg";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Login - WM BlackCode" },
    { name: "description", content: "Iniciar sesión en la plataforma WM BlackCode" },
  ];
};

export default function Welcome() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Función de login con validación de campos
  const handleLogin = () => {
    // Validar que ambos campos estén completos
    if (!username.trim()) {
      setError("Debes ingresar un nombre de usuario");
      return;
    }
    
    if (!password.trim()) {
      setError("Debes ingresar una contraseña");
      return;
    }
    
    // Si llegamos aquí, ambos campos están completos
    console.log("Iniciando sesión con:", username, password);
    setError(""); // Limpiar cualquier error previo

    // Navegar al dashboard usando React Router
    navigate("/dashboard");
  };

  // También permitimos el envío del formulario para admitir la tecla Enter
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <main 
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-black rounded-xl p-8 shadow-xl w-full max-w-sm transition-all duration-300 hover:shadow-2xl relative z-10" 
        style={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5), 0 6px 12px rgba(0, 0, 0, 0.4)" }}>
        
        <div className="flex justify-center mb-8">
          <img
            src={wmblackcodeLong}
            alt="WM BLACKCODE"
            className="w-64 max-w-full transition-all duration-500 hover:scale-105"
          />
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Mostrar mensaje de error si existe */}
          {error && (
            <div className="bg-red-900 bg-opacity-50 text-red-200 p-2 rounded text-sm">
              {error}
            </div>
          )}
          
          <div className="relative">
            <div className={`relative border ${error && !username.trim() ? 'border-red-500' : 'border-gray-300'} rounded overflow-hidden transition-all duration-300 ${usernameFocused || username ? 'border-yellow-500 shadow-md' : ''}`}>
              <input
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error && e.target.value.trim()) setError("");
                }}
                onFocus={() => setUsernameFocused(true)}
                onBlur={() => setUsernameFocused(false)}
                className="w-full p-3 bg-transparent text-white outline-none pt-5"
                required
              />
              <label 
                htmlFor="username" 
                className={`absolute transition-all duration-300 pointer-events-none ${
                  usernameFocused || username 
                    ? 'text-xs text-yellow-500 top-1 left-2' 
                    : 'text-gray-400 top-3 left-3'
                }`}
              >
                USERNAME
              </label>
              <div className={`absolute bottom-0 left-0 h-0.5 bg-yellow-500 transition-all duration-300 ${usernameFocused || username ? 'w-full' : 'w-0'}`}></div>
            </div>
          </div>

          <div className="relative">
            <div className={`relative border ${error && !password.trim() ? 'border-red-500' : 'border-gray-300'} rounded overflow-hidden transition-all duration-300 ${passwordFocused || password ? 'border-yellow-500 shadow-md' : ''}`}>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error && e.target.value.trim()) setError("");
                }}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="w-full p-3 bg-transparent text-white outline-none pt-5"
                required
              />
              <label 
                htmlFor="password" 
                className={`absolute transition-all duration-300 pointer-events-none ${
                  passwordFocused || password 
                    ? 'text-xs text-yellow-500 top-1 left-2' 
                    : 'text-gray-400 top-3 left-3'
                }`}
              >
                PASSWORD
              </label>
              <div className={`absolute bottom-0 left-0 h-0.5 bg-yellow-500 transition-all duration-300 ${passwordFocused || password ? 'w-full' : 'w-0'}`}></div>
            </div>
          </div>

          {/* Botón de envío del formulario */}
          <button
            type="submit"
            className="mt-2 w-full bg-yellow-500 text-black font-semibold py-2 rounded transition-all duration-300 hover:bg-yellow-400 transform hover:scale-105 active:scale-95"
          >
            LOGIN
          </button>
        </form>
      </div>
    </main>
  );
}