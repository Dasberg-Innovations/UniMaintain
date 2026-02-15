import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";

const LOGIN_URL = "/api/users/login";

const Login = () => {
    const { setAuth, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
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
                { withCredentials: true}
            );

            const user = response?.data?.user;
            setAuth({ email: user.email, name: user.name });
            setIsLoggedIn(true);

            setEmail('');
            setPwd('');

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Email or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            {isLoggedIn ? (
                <section>
                    <h1>Success!</h1>
                    <p>You are logged in.</p>
                    <br />
                    <p>
                        <a href="/">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
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
                            <a href="/register">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
};

export default Login;
