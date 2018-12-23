import {CoreLayoutUI} from "./CoreLayoutUI";
import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {addUserAC} from "../../_Redux/ActionCreators/User-ActionCreator";
import {connect} from 'react-redux';


class CoreLayout extends Component {

    constructor(props) {
        super(props);
        if (this.props.user == null || this.props.user === "loading") {
            this.props.history.push("/");
        }
    }

    shouldComponentUpdate() {

        console.log(this.props.user);

        if (this.props.user == null || this.props.user === "loading") {
            this.props.history.push("/");
            return false;
        }

        return true;


    }

    render() {
        console.log(this.props.children);

        if (this.props.user == null || this.props.user === "loading") {
            this.props.history.push("/");
        }

        return (
            <CoreLayoutUI user={this.props.user} addUserAction={this.props.addUserAction}>
                {this.props.children}
            </CoreLayoutUI>
        )

    }
}

function mapStateToProps(state, ownProps) {


    return {
        user: state.user,
        ...ownProps
    }

}


function mapDispatchToProps(dispatch) {

    return {
        addUserAction: (userDetails) => {
            dispatch(addUserAC(userDetails))
        }
    }
}

let CoreLayoutContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CoreLayout));

export {CoreLayoutContainer};