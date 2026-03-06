import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const REPORT_URL = "/api/reports";

const ReportForm = () => {

    const errRef = useRef();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState("");
    const [campus, setCampus] = useState('');
    const [building, setBuilding] = useState('');
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("");

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const categoryList = [
        "General Maintenance",
        "Electrical",
        "Plumbing",
        "Grounds",
        "IT",
        "Safety"
    ];

    const priorityList = ["Low", "Medium", "High"];

    const campusData = {
        "Main Campus": [
            "Administrative Building",
            "Cafeteria",
            "ESL Department",
            "Estate Police",
            "Ford Library",
            "S P E Development",
            "Kennedy Industrial Arts",
            "La Realista",
            "Ladies' Dormitory",
            "Married Student Complex",
            "Music Building",
            "Reference Library",
            "School of Business",
            "School of Science & Technology",
            "School of Social Sciences",
            "School of Social Sciences Annex",
            "School of Theology",
            "Timothy Graves Dormitory",
            "Vernan Andrews Amphitheatre"
        ],
        "South Campus": [
            "Offices",
            "Classroom Block"
        ]
    };

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
                        Authorization: `Bearer ${localStorage.getItem("token")}` 
                    }
                }
            );

            console.log(response?.data);

            setSuccess(true);

            // reset form
            setTitle('');
            setDescription('');
            setPhone('');
            setCampus('');
            setBuilding('');
            setCategory('');
            setPriority('');

        } catch (err) {

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

            errRef.current.focus();
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">

                {success ? (
                    <section>
                        <h1>Report Submitted!</h1>
                        <p>Your maintenance request has been logged.</p>
                        <p>
                            <Link to="/user" className="line">
                                Return to Dashboard
                            </Link>
                        </p>
                    </section>

                ) : (

                    <>
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
                                {Object.keys(campusData).map((camp) => (
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
                                    campusData[campus].map((bldg) => (
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
                                {categoryList.map((cat) => (
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
                                {priorityList.map((p) => (
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
                    </>
                )}
            </div>
        </div>
    );
};

export default ReportForm;