import {UpdateApplicationStatusButtonsUI} from "./UpdateApplicationStatusButtonsUI";
import React from "react";
import {updateApplications, updateApplicationStatusByTestAttemptIDAsyncAC} from "../../../_Redux/ActionCreators/TestAttempts-ActionCreator";
import {connect} from 'react-redux';


function UpdateApplicationStatusButtons(props) {


    return (<UpdateApplicationStatusButtonsUI type={props.type}
                                              onClick={() => props.updateApplications(props.selectedApplicants, props.type)}/>);

}


function mapDispatchToProps(dispatch) {

    return {
        updateApplications: (updatedApplications, newType) => {
            dispatch(updateApplicationStatusByTestAttemptIDAsyncAC(updatedApplications, newType))
        }
    }

}


let UpdateApplicationStatusButtonsContainer = connect(null, mapDispatchToProps)(UpdateApplicationStatusButtons);

export {UpdateApplicationStatusButtonsContainer};
