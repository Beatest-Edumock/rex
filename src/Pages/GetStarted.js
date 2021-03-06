import React from 'react';
import {Box, Heading, MenuButton} from 'grommet';
import Joyride from 'react-joyride';

const steps = [
    {
        disableBeacon: true,
        target: '#shortlist-menu-btn',
        content: 'Get an overview of all applicants',
        placement: 'auto',
        isFixed: true
    },
    {
        disableBeacon: true,
        target: '#analysis-menu-btn',
        content: 'Detailed analysis on one applicant',
        placement: 'auto',
    },
    {
        disableBeacon: true,
        target: '#demo-menu-btn',
        content: 'Take a few demo exams',
        placement: 'top',
    },
    {
        disableBeacon: true,
        target: '#hamburger-btn',
        content: 'Click here to toggle the sidebar',
        placement: 'auto',
    },
];

function GetStartedUI() {

    return (

        <React.Fragment>
            <Box align={"center"} basis="full" justify="center">
                <Heading level={2} textAlign={"center"}>Welcome! </Heading>
                <Heading level={3}>Please select an option from the left to get started</Heading>
            </Box>

            <Joyride
                steps={steps}
                continuous={true}
                disableOverlayClose={true}
                spotlightClicks={true}
                showProgress={true}
                run={true}
            />
        </React.Fragment>
    )
}

export {GetStartedUI};
