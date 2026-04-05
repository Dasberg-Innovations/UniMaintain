import React from "react";
import { Autocomplete, TextField, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AssignedTo = ({ users, editedReport, handleChange }) => {
    const assignmentOptions = users?.map(u => ({
        label: `${u.name} - ${u.maintenanceRole || "No Role"}`,
        value: u._id
    }));

    return (
        <Autocomplete
            multiple
            options={assignmentOptions}
            disableCloseOnSelect
            getOptionLabel={(option) => option.label}
            value={assignmentOptions.filter(opt =>
                editedReport.assignedTo?.includes(opt.value)
            )}
            onChange={(event, newValue) => {
                const selectedIds = newValue.map(v => v.value);
                handleChange("assignedTo", selectedIds);
            }}
            isOptionEqualToValue={(option, value) => option.value === value.value}
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
                placeholder={editedReport.assignedTo?.length ? "" : "Assign..."}
                />
            )}
        />
    );
};

export default AssignedTo;