import React from "react";
import { Dropdown } from "semantic-ui-react";

const statusOptions = [
    {
        key: "619.956.8453",
        text: "619.956.8453",
        value: 1
    }
];

class PhoneDropdown extends React.Component {
    render() {
        const { onChange } = this.props;
        return (
            <Dropdown
                selection
                compact
                options={statusOptions}
                value={1}
                onChange={onChange}
                style={{
                    font: "16px Medium Lato",
                    color: "#959494",
                    boxShadow: "0px 3px 6px #00000039",
                    border: "1px solid #959494",
                    width: "205px",
                    padding: "10px 13px"
                }}
            />
        );
    }
}

export default PhoneDropdown;
