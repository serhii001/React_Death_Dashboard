import React from "react";
import { Dropdown } from "semantic-ui-react";

const actionOptions = [
    {
        key: "Smart Credit Pulled",
        text: "Smart Credit Pulled",
        value: 1
    }
];

class ActionDropdown extends React.Component {
    render() {
        return (
            <Dropdown
                selection
                compact
                options={actionOptions}
                value={1}
                style={{
                    font: "15px Medium Lato",
                    color: "rgb(32, 203, 150)",
                    boxShadow: "rgba(0, 0, 0, 0.224) 0px 3px 6px",
                    border: "1px solid rgb(149, 148, 148)",
                    width: "170px",
                    padding: "10px 10px",
                    borderRadius: "20px"
                }}
            />
        );
    }
}

export default ActionDropdown;
