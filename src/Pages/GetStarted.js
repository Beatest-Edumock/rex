import React from 'react';
import {Box, Heading, MenuButton} from 'grommet';

function GetStartedUI() {
    return (
        <Box align={"center"} basis="full" justify="center">
            <Heading level={2} textAlign={"center"}>Welcome! </Heading>
            <Heading level={3}>Please select an option from the left to get started</Heading>
        </Box>
    )
}

export {GetStartedUI};
