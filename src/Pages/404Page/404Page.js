import React from 'react';
import {Anchor, Box, Heading} from 'grommet';

function NotFoundPage() {

    return (
        <Box background='light-2' align="center" fill={true} alignContent='center'>


            <Heading level={2}
                     textAlign="center"
            >
                Page not found
            </Heading>
            <Anchor href="/">Go to Home Page</Anchor>
        </Box>
    )

}


export {NotFoundPage};