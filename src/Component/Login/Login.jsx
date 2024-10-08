import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { loginUser, signupUser } from "./../../store/features/userSlice";
import { toast } from "react-toastify";
import "./login.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [referralId, setReferralId] = useState(""); // Add referralId state

  const { data, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object

  // Get the referral ID from the URL if present
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const ref = searchParams.get("ref");
    if (ref) {
      setReferralId(ref);
      setIsLogin(false); // Automatically open signup form if referral is present
    }
  }, [location.search]);

  // Handle login
  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  // Handle signup
  const handleSignup = () => {
    if (!displayName || !email || !password || !country || !state || !city) {
      toast.error("Please fill all fields");
      return;
    }

    const userData = {
      displayName,
      email,
      password,
      country,
      state,
      city,
      referral: referralId || null, // Include referral ID if present, else null
    };

    dispatch(signupUser(userData));
  };

  // Redirect if logged in
  if (data?._id) {
    navigate("/home");
    toast.success("Welcome to Bees!");
  }

  return (
    <div className="auth-page">
      <div className="form">
        <h1>{isLogin ? "Welcome Back!" : "Create an Account"}</h1>

        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            {/* Optional Referral Code */}
            <input
              type="text"
              placeholder="Referral ID (optional)"
              value={referralId}
              onChange={(e) => setReferralId(e.target.value)} // Allow user to modify
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="auth-btn"
          onClick={isLogin ? handleLogin : handleSignup}
          disabled={loading}
        >
          {loading
            ? isLogin
              ? "Logging in..."
              : "Signing up..."
            : isLogin
            ? "Login"
            : "Signup"}
        </button>

        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Auth;
