import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import "../css-files-pages/Login.css";
import img from "../assets/UniMaintainLogo.png";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/api/users/register";

const Register = () => {
    const emailRef = useRef();
    const errRef = useRef();

    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [matchPwd, setMatchPwd] = useState('');

    // Validation state
    const [validEmail, setValidEmail] = useState(false);
    const [validPwd, setValidPwd] = useState(false);
    const [validMatch, setValidMatch] = useState(false);

    // Focus states
    const [emailFocus, setEmailFocus] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // Focus on email input on mount
    useEffect(() => {
        emailRef.current.focus();
    }, []);

    // Validate email
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    // Validate password and match
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    // Clear error messages on input change
    useEffect(() => {
        setErrMsg('');
    }, [email, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validEmail || !validPwd || !validMatch) {
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            const response = await axios.post(
                REGISTER_URL,
                { name, email, password: pwd },
                { withCredentials: true }
            );

            console.log(response?.data);
            setSuccess(true);

            // clear form
            setName('');
            setEmail('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Email Already Registered');
            } else {
                setErrMsg('Registration Failed');
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

                {success ? (
                    <section>
                        <h1>Success!</h1>
                        <p><a href="/login" className="line">Sign In</a></p>
                    </section>
                ) : (
                    <>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                            {errMsg}
                        </p>
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit}>
                            {/* Name */}
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                autoComplete="off"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                            />

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
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="emailnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                            <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                Must be a valid email address.
                            </p>

                            {/* Password */}
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                8 to 24 characters, must include uppercase, lowercase, number, and special character (!@#$%).
                            </p>

                            {/* Confirm Password */}
                            <label htmlFor="confirm_pwd">Confirm Password:</label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                Must match the first password input.
                            </p>

                            <button disabled={!validEmail || !validPwd || !validMatch}>Sign Up</button>
                        </form>
                        <p>
                            Already registered?<br />
                            <span className="line"><a href="/login">Sign In</a></span>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Register;