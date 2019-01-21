import {UpdateApplicationStatusButtonsUI} from "./UpdateApplicationStatusButtonsUI";
import React from "react";
import {updateApplications, updateApplicationStatusByTestAttemptIDAsyncAC} from "../../../_Redux/ActionCreators/TestAttempts-ActionCreator";
import {connect} from 'react-redux';


function UpdateApplicationStatusButtons(props) {

    return (<UpdateApplicationStatusButtonsUI onClick={() => props.updateApplications(props.selectedApplicants)}/>)

}


function mapDispatchToProps(dispatch) {

    return {
        updateApplications: (updatedApplications) => {
            dispatch(updateApplicationStatusByTestAttemptIDAsyncAC(updatedApplications, "accepted"))
        }
    }

}


let UpdateApplicationStatusButtonsContainer = connect(null, mapDispatchToProps)(UpdateApplicationStatusButtons);

export {UpdateApplicationStatusButtonsContainer};
