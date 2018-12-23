import React from 'react';
import {Box, Layer} from "grommet";
import {RingLoader} from "react-spinners";

/**
 * Displays a Loading spinner
 * This will be displayed at the center of the parent
 *
 * @returns {*}
 * @constructor
 */
function LoadingSpinner(props) {


    return (
        <Layer position='center'>
            <Box round="small" align="center">
                <RingLoader size={99} color={"#4A90E2"}/>
            </Box>
        </Layer>
    )
}


export {LoadingSpinner}
