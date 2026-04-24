import React from "react";
import { Autocomplete, TextField, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AssignedTo = ({ users, editedReport, handleChange }) => {

    // map users to label/value for the dropdown
    const assignmentOptions = users?.map(u => ({
        label: `${u.name} - ${u.maintenanceRole || "No Role"}`,
        value: u._id
    }));

    return (
        <Autocomplete
            multiple                        // allow multiple selection
            options={assignmentOptions}     // options to pick from
            disableCloseOnSelect            // dropdown stays open while selecting
            getOptionLabel={(option) => option.label}   // show name + role
            value={assignmentOptions.filter(opt =>
                editedReport.assignedTo?.includes(opt.value)    // pre-select assigned users
            )}
            onChange={(event, newValue) => {
                const selectedIds = newValue.map(v => v.value); // get selected IDs
                handleChange("assignedTo", selectedIds);        // update parent state
            }}
            isOptionEqualToValue={(option, value) => option.value === value.value} // matching for MUI
            renderOption={(props, option, { selected }) => (
                <li {...props}>
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
                label="Assignment"
                placeholder={editedReport.assignedTo?.length ? "" : "Assign..."}    // placeholder if empty
                />
            )}
        />
    );
};

export default AssignedTo;