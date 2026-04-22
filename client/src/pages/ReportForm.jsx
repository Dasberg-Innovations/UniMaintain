import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth";
import "../css/reportForm.css";
import "../css/Dashboard.css";
import {
  STATUS_LIST,
  CATEGORY_LIST,
  PRIORITY_LIST,
  CAMPUS_DATA
} from "../constants/reportOptions";

const REPORT_URL = "/api/reports";

// form used to submit new maintenance reports
const ReportForm = () => {

    // auth for API requests + role access
    const { auth, logout } = useAuth();

    // used to focus error messages
    const errRef = useRef();

    // form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState("");
    const [campus, setCampus] = useState('');
    const [building, setBuilding] = useState('');
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("");

    // error message display
    const [errMsg, setErrMsg] = useState('');
    // submission success state
    const [success, setSuccess] = useState(false);

    // submit report to backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrMsg('');

        try {

            const response = await axios.post(
                REPORT_URL,
                {
                    title,
                    description,
                    phone,
                    campus,
                    building,
                    category,
                    priority
                },
                {
                    headers: { 
                        Authorization: `Bearer ${auth?.accessToken}` 
                    }
                }
            );

            console.log(response?.data);

            setSuccess(true);   // show success screen

            // reset form after submission
            setTitle('');
            setDescription('');
            setPhone('');
            setCampus('');
            setBuilding('');
            setCategory('');
            setPriority('');

        } catch (err) {

            // handle API errors
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing Required Fields");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Report Submission Failed");
                err
                console.log(err);
            }

            errRef.current.focus(); // focus error message
        }
    };

    return (
        <div className="report-container">
          <Sidebar role={auth?.role} activePage="create" />

            <div className="report-content">
                {success ? (
                    // success screen after submission
                    <section className="report-success">
                        <h1>Report Submitted!</h1>
                        <p>Your maintenance request has been logged.</p>
                        <p>
                            <Link to="/dashboard" className="line">
                                Return to Dashboard
                            </Link>
                        </p>
                    </section>

                ) : (

                    <div className="report-form-box">
                        {/* error message display */}
                        <p
                            ref={errRef}
                            className={errMsg ? "errmsg" : "offscreen"}
                            aria-live="assertive"
                        >
                            {errMsg}
                        </p>

                        <h1>Submit Maintenance Report</h1>

                        <form onSubmit={handleSubmit}>

                            {/* Title */}
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                autoComplete="off"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                required
                            />

                            {/* Campus */}
                            <label htmlFor="campus">Campus:</label>
                            <select
                                id="campus"
                                value={campus}
                                onChange={(e) => {
                                    setCampus(e.target.value);
                                    setBuilding("");
                                }}
                                required
                            >
                                <option value="">-- Select Campus --</option>
                                {Object.keys(CAMPUS_DATA).map((camp) => (
                                    <option key={camp} value={camp}>
                                        {camp}
                                    </option>
                                ))}
                            </select>

                            {/* Building */}
                            <label htmlFor="building">Building:</label>
                            <select
                                id="building"
                                value={building}
                                onChange={(e) => setBuilding(e.target.value)}
                                disabled={!campus}
                                required
                            >
                                <option value="">-- Select Building --</option>
                                {campus &&
                                    CAMPUS_DATA[campus].map((bldg) => (
                                        <option key={bldg} value={bldg}>
                                            {bldg}
                                        </option>
                                    ))}
                            </select>

                            {/* Category */}
                            <label htmlFor="category">Category:</label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="">-- Select Category --</option>
                                {CATEGORY_LIST.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>

                            {/* Priority */}
                            <label htmlFor="priority">Priority:</label>
                            <select
                                id="priority"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                required
                            >
                                <option value="">-- Select Priority --</option>
                                {PRIORITY_LIST.map((p) => (
                                    <option key={p} value={p}>
                                        {p}
                                    </option>
                                ))}
                            </select>

                            {/* Phone */}
                            <label htmlFor="phone">Phone Number:</label>
                            <input
                                type="tel"
                                id="phone"
                                autoComplete="off"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Contact Number"
                                required
                            />

                            {/* Description */}
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                rows="5"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe the issue in detail..."
                                required
                            />

                            <button>
                                Submit Report
                            </button>

                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportForm;