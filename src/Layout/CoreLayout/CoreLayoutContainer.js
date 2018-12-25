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


        if (this.props.user == null || this.props.user === "loading") {
            this.props.history.push("/");
            return false;
        }

        return true;


    }

    render() {

        if (this.props.user == null || this.props.user === "loading") {
            this.props.history.push("/");
            return <div></div>
        }

        return (
            <CoreLayoutUI user={this.props.user}
                          addUserAction={this.props.addUserAction}
                          shouldShortListModalOpen={false}
            >
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