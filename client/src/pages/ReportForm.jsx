import { useState } from "react";

const ReportForm = () => {

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState("");
    const [campus, setCampus] = useState('');
    const [building, setBuilding] = useState('');

    const categoryList = ["General Maintenance", "Electrical", "Plumbing", "Grounds", "IT", "Safety"]
    const [category, setCategory] = useState("");

    const priorityList = ["Low", "Medium", "High"];
    const [priority, setPriority] = useState("");


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
            "Married Studentd Complex",
            "Music Building",
            "Reference Library",
            "School of Buiness",
            "School of Science & Technology",
            "School of Social Sciences",
            "School of Social Sciences Annex",
            "School of Theology",
            "Timothy Graves Dormitory",
            "Vernan Andrews Amphitheatre"
        ],

        "South Campus":[
            "Offices",
            "Classroom Block"
        ]
    }

    const handleSubmit = (e) => {
    e.preventDefault();

    const reportData = {
        title,
        description,
        phone,
        campus,
        building,
        category,
        priority
    };

    console.log(reportData);

    // Later: send to backend
    };
    return ( 
        <div>
            <h2>Report Form</h2>
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

                {/* Location */}
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

                <label htmlFor="building">Building:</label>
                <select
                    id="building"
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    required
                    disabled={!campus}
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
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                placeholder="Contact Number"
                required
                />

                {/* Description */}
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    autoComplete="off"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    rows="5"
                    placeholder="Describe the issue in detail..."
                    required
                />                
                <button>Submit Form</button>
            </form>
        </div>
     );
}
 
export default ReportForm;