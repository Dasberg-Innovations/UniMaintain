import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom"

import axios from "../api/axios";
import "../css-files-pages/Login.css";
import img from "../assets/UniMaintainLogo.png";

const LOGIN_URL = "/api/users/login";

const Login = () => {
    const { setAuth, isLoggedIn, setIsLoggedIn } = useAuth();

    const navigate = useNavigate();

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    // focus email input on mount
    useEffect(() => {
        emailRef.current.focus();
    }, []);

    // clear error message when input changes
    useEffect(() => {
        setErrMsg('');
    }, [email, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                LOGIN_URL,
                { email, password: pwd },
                { withCredentials: true }
            );

            const user = response?.data?.user;
            const accessToken = response?.data.accessToken;
            
            setAuth({ 
                email: user.email, 
                name: user.name , 
                role: user.role, 
                accessToken
            });
            
            setIsLoggedIn(true);
            localStorage.setItem("token", response.data.accessToken);

            setEmail('');
            setPwd('');

            if (user.role === "admin") {
                navigate("/admin", { replace: true });
            } else if (user.role === "maintenance") {
                navigate("/maintenance", { replace: true });
            } else {
                navigate("/user", { replace: true });
            }

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Email or Password');
            } else if (err.response?.status === 401) {
                setErrMsg(err.response.data.message || 'Invalid email or password');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    return (

        <div className="login-container">
            <div className="login-box">
                <img
                    src={img}
                    alt="UniMaintain Logo"
                    style={{ width: "190px", height: "auto", display: "block", margin: "0 auto 15px" }}
                />
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                    {errMsg}
                </p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        ref={emailRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />

                    {/* Password */}
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />

                    <button>Sign In</button>
                </form>

                <p>
                    Need an Account?<br />
                    <span className="line">
                        <Link to="/register">Sign Up</Link>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;