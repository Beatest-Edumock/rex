import React from "react";
import {Button} from "grommet";

function UpdateApplicationStatusButtonsUI(props) {
    let label = null;
    let color = null;

    switch (props.type) {
        case "accepted":
            label = "Accept";
            color = "status-ok";
            break;
        case "shortlisted":
            label = "Wait-List";
            color = "status-warning";
            break;
        case "rejected":
            label = "Reject";
            color = "status-critical";


    }

    return (
        <Button primary color={color} label={label} onClick={props.onClick}/>
    );
}

export {UpdateApplicationStatusButtonsUI};
