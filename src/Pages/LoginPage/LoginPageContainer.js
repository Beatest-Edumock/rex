import React from 'react';

import {LoginPageUI} from "./LoginPageUI";
import {loginUserApi} from "../../_Api/User";
import {connect} from 'react-redux'
import {addUserAC} from "../../_Redux/ActionCreators/User-ActionCreator";
import {withRouter} from "react-router-dom";

class LoginPage extends React.Component {

    constructor() {
        super();
        this.onSubmitCallback = this.onSubmitCallback.bind(this);
    }

    componentDidUpdate() {

        if (this.props.user !== null && this.props.user !== "loading")
            this.props.history.push("/get-started");

        return true;
    }

    onSubmitCallback(values, {setSubmitting, setErrors}) {

        setSubmitting(true);

        loginUserApi(values.email, values.password).then(({data}) => {

            this.props.addUserAction(data);
            this.props.history.push("/shortlist");

        }).catch(({response}) => {
            setErrors({info: response.data.message});
        }).then(() => {
            setSubmitting(false);
        });

    }


    render() {


        return (
            <LoginPageUI loading={this.props.user === "loading"} onSubmitCallback={this.onSubmitCallback}/>
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


let LoginPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));


export {LoginPageContainer}