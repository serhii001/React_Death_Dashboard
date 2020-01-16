import React from "react";
import { Dropdown } from "semantic-ui-react";

const statusOptions = [
    {
        key: "Working",
        text: "Working",
        value: 1
    }
];

class ContactBox extends React.Component {
    render() {
        return (
            <Dropdown
                selection
                compact
                options={statusOptions}
                value={1}
                style={{
                    font: "18px Medium Lato",
                    color: "#20CB96",
                    boxShadow: "0px 3px 6px #00000039",
                    border: "1px solid #959494",
                    width: "135px",
                    padding: "13px 16px"
                }}
            />
        );
    }
}

export default ContactBox;
