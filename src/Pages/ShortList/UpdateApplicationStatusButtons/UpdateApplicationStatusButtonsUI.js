import React from "react";
import {Button} from "grommet";

function UpdateApplicationStatusButtonsUI(props) {

    return (
        <Button primary color="status-ok" label={"Approve"} onClick={props.onClick}/>
    )
}

export {UpdateApplicationStatusButtonsUI};
