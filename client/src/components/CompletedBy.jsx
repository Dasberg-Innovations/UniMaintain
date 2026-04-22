import React from "react";
import { Autocomplete, TextField, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CompletedBy = ({ users, editedReport, handleChange }) => {

    // map users to label/value for the dropdown
    const completedOptions = users?.map(u => ({
        label: `${u.name} - ${u.maintenanceRole || "No Role"}`,
        value: u._id
    })) || [];

    return (
        <Autocomplete
            multiple                        // allow multiple selection
            options={completedOptions}          // options to pick from
            disableCloseOnSelect            // dropdown stays open while selecting
            getOptionLabel={(option) => option.label}   // show name + role
            value={completedOptions.filter(opt =>
                editedReport.completedBy?.includes(opt.value)   // pre-select assigned users
            )}
            onChange={(event, newValue) => {
                const selectedIds = newValue.map(v => v.value); // get selected IDs
                handleChange("completedBy", selectedIds);       // update parent state
            }}
            isOptionEqualToValue={(option, value) => option.value === value.value}  // matching for MUI
            renderOption={(props, option, { selected }) => (
                <li key={option.value} {...props}>
                <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                />
                {option.label}
                </li>
            )}
            renderInput={(params) => (
                <TextField
                {...params}
                placeholder={editedReport.completedBy?.length ? "" : "Unassigned"}  // placeholder if empty
                />
            )}
        />
    );
};

export default CompletedBy;