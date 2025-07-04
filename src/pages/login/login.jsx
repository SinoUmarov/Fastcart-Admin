import { toast } from "react-toastify";
import Logo from "./img/Group 1116606595 (1).png";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { axiosRequest } from '../../api/axiosRequest'

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("Admin");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate, token]);

  async function funAdmin() {
    if (!name || !pass) {
      toast.error("Please fill in both username and password.", { autoClose: 2000 });
      return;
    }

    setLoading(true);

    const admin = {
      userName: name,
      password: pass,
    };

    try {
      const { data } = await axiosRequest.post(`/Account/login`, admin);

      if (data?.data) {
        localStorage.setItem("Admin", data.data);
        toast.success("Login Successfully", { autoClose: 1500 });
        navigate("/dashboard");
      } else {
        toast.error("Invalid response from server.", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.", { autoClose: 2500 });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-tr from-blue-600 via-purple-700 to-pink-600">
      
      <section className="md:w-1/2 flex flex-col justify-center items-center p-10 bg-black bg-opacity-70 relative overflow-hidden">
       
        <img
          src={Logo}
          alt="Logo"
          className="w-36 md:w-48 mb-6 animate-fadeInScale"
          style={{ animationDelay: "0.3s" }}
        />
        <h2 className="text-white text-4xl font-extrabold mb-2 text-center animate-fadeIn" style={{ animationDelay: "0.6s" }}>
          Welcome to Admin Panel User
        </h2>
        <p
          className="text-gray-300 text-lg max-w-md text-center leading-relaxed animate-fadeIn"
          style={{ animationDelay: "0.9s" }}
        >
          Please log in with your credentials to manage the dashboard.
        </p>
    
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="w-72 h-72 bg-pink-500 rounded-full filter blur-3xl opacity-40 absolute -top-20 -left-20 animate-blob"></div>
          <div className="w-72 h-72 bg-purple-500 rounded-full filter blur-3xl opacity-30 absolute -bottom-20 -right-20 animate-blob animation-delay-4000"></div>
        </div>
      </section>

     
      <section className="md:w-1/2 flex justify-center items-center p-10 bg-white bg-opacity-90">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-10 transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center select-none">Login</h2>

          <input
            type="text"
            placeholder="User Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full mb-6 p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            disabled={loading}
          />

          <div className="flex justify-between items-center mb-6">
            <button
              className="text-sm text-blue-600 hover:underline disabled:text-gray-400 transition-colors"
              onClick={() => toast.info("Contact support to reset your password.", { autoClose: 2000 })}
              disabled={loading}
            >
              Forgot password?
            </button>
          </div>

          <button
            onClick={funAdmin}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white text-xl font-semibold transition-colors ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
            }`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </div>
      </section>

     
      <style>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeInScale {
          animation: fadeInScale 0.6s ease forwards;
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease forwards;
        }
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite ease-in-out;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Login;
