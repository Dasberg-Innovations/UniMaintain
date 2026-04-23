import React from "react";
import "../css/SearchFilter.css";

const SearchFilter = () => {
return (
    <div className="search-filter-container">
      
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search by name or email..."
        />
      </div>

      <select>
        <option value="">Filter by Role</option>
        <option value="Admin">Admin</option>
        <option value="User">User</option>
        <option value="Maintenance">Maintenance</option>
      </select>

      <select>
        <option value="">Filter by Maintenance Type</option>
        <option value="Electrical">Electrical</option>
        <option value="Plumbing">Plumbing</option>
        <option value="General">General</option>
      </select>

    </div>
  );
};

export default SearchFilter;