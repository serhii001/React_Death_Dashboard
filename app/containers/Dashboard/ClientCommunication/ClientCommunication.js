// This is a template for creating new reactJS files

// Importing React
import React from 'react';

// Importing Material UI
import TopBar from "../../TopBar.js";
import SearchBar from "../../SearchBar";

// Importing base CSS
import "../../../css/Dashboard/Dashboard.css"
import "../../../css/Dashboard/ClientCommunication.css"

// Importing extra components
import ClientCommunicationCall from "./ClientCommunicationCall";
import ClientCommunicationSMS from "./ClientCommunicationSMS";

// Building topbar constants
const tabs = ["All Calls", "All SMS", "All Notes", "All Emails"];
const topbar_icons = ["phone","commenting", "list", "envelope"];

export default class ClientCommunication extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            app_value: tabs[0],
            search_text_filter: ""
        };

        this.handleAppBarChange = this.handleAppBarChange.bind(this);
        this.onTextfieldChange = this.onTextfieldChange.bind(this);
    }

    handleAppBarChange(value) {
        this.setState({app_value: value});
    }

    onTextfieldChange(value) {
        this.setState({search_text_filter: value});
    }

    render() {

        // Building the app value object
        let app_value = this.state.app_value;

        return (
            <div className = "primary_container">
                <div className = "dashboard_title_holder">
                    Client Communication
                </div>

                <div className = "searchbar_holder">
                    <SearchBar 
                        onTextfieldChange = {this.onTextfieldChange}
                    />
                </div>

                <br/>
                <br/>
                <br/>
                <br/>

                <TopBar 
                    tabs = {tabs}
                    value = {app_value}
                    onChange = {this.handleAppBarChange}
                    icons = {topbar_icons}
                />
                {app_value === tabs[0] && <ClientCommunicationCall search_text_filter = {this.state.search_text_filter} user_info = {this.props.user_info} credentials = {this.props.credentials} />}
                {app_value === tabs[1] && <ClientCommunicationSMS search_text_filter = {this.state.search_text_filter} credentials = {this.props.credentials} />}

            </div>
        )
    }
}