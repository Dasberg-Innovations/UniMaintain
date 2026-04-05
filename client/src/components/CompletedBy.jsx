import React from "react";
import { Autocomplete, TextField, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CompletedBy = ({ users, editedReport, handleChange }) => {

    const completedOptions = users?.map(u => ({
        label: `${u.name} - ${u.maintenanceRole || "No Role"}`,
        value: u._id
    })) || [];

    return (
        <Autocomplete
            multiple
            options={completedOptions}
            disableCloseOnSelect
            getOptionLabel={(option) => option.label}
            value={completedOptions.filter(opt =>
                editedReport.completedBy?.includes(opt.value)
            )}
            onChange={(event, newValue) => {
                const selectedIds = newValue.map(v => v.value);
                handleChange("completedBy", selectedIds);
            }}
            isOptionEqualToValue={(option, value) => option.value === value.value}
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
                label="Completed By"
                placeholder={editedReport.completedBy?.length ? "" : "Unassigned"}
                />
            )}
        />
    );
};

export default CompletedBy;