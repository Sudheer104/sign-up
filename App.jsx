import React, { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { GiCircleClaws } from "react-icons/gi";
import "./App.css";

export default function App() {
  const savedEmail = localStorage.getItem("cogie_email") || "";
  const savedRemember = localStorage.getItem("cogie_remember") === "1";

  const [email, setEmail] = useState(savedEmail);
  const [password, setPassword] = useState(
    savedRemember ? localStorage.getItem("cogie_password") || "" : ""
  );
  const [remember, setRemember] = useState(savedRemember);
  const [show, setShow] = useState(false);

 
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  function validate() {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address.";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  function onSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    if (remember) {
      localStorage.setItem("cogie_email", email);
      localStorage.setItem("cogie_password", password);
      localStorage.setItem("cogie_remember", "1");
    } else {
      localStorage.setItem("cogie_email", email);
      localStorage.removeItem("cogie_password");
      localStorage.setItem("cogie_remember", "0");
    }

    alert("Signed in successfully!");
  }

  return (
    <div className="fs">
      <img className="bg-img" src="./src/assets/bgimage1.jpg" alt="background" />

      <div className="container">

        {/* LEFT SECTION */}
        <div className="left">
          <img className="left-cover" src="./src/assets/bgimage.jpg" alt="decor" />

          <div className="overlay-top">
            <p>A WISE QUOTE</p>
            <span className="line"></span>
          </div>

          <div className="overlay-bottom">
            <div className="big-lines">
              GET <br /> EVERYTHING <br /> YOU WANT
            </div>
            <p className="sub">
              You can get everything you want if you work hard,
              <br /> trust the process and stick to the plan.
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="right">
          <div className="form-wrapper">

            <div className="top">
              <GiCircleClaws className="brand-icon" />
              <div className="brand-text">Cogie</div>
            </div>

            <form className="middle" onSubmit={onSubmit} noValidate>

              <h1 className="title">Welcome Back</h1>
              <p className="lead">Enter your email and password to access your account</p>

              {/* EMAIL */}
              <div className="field">
                <label htmlFor="email">Email</label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />

                {errors.email && (
                  <div id="email-error" className="err" role="alert">
                    {errors.email}
                  </div>
                )}
              </div>

              {/* PASSWORD */}
              <div className="field">
                <label htmlFor="password">Password</label>

                <div className="pwd-wrap">
                  <input
                    id="password"
                    placeholder="Enter your password"
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={errors.password ? "true" : "false"}
                    aria-describedby={errors.password ? "password-error" : undefined}
                  />

                  <button
                    type="button"
                    className="eye"
                    onClick={() => setShow((s) => !s)}
                    aria-label={show ? "Hide password" : "Show password"}
                  >
                    {show ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </button>
                </div>

                {errors.password && (
                  <div id="password-error" className="err" role="alert">
                    {errors.password}
                  </div>
                )}
              </div>

              {/* REMEMBER + FORGOT */}
              <div className="opts">
                <label className="remember">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Remember me
                </label>

                <a className="forgot" href="#">Forgot Password?</a>
              </div>

              {/* BUTTONS */}
              <button className="btn primary" type="submit">Sign In</button>

              <button type="button" className="btn google">
                <img src="./src/assets/google.svg" alt="Google logo" />
                Sign In with Google
              </button>
            </form>

            <div className="bottom">
              <p>
                Don't have an account? <a href="#">Sign Up</a>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
