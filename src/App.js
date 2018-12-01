import React, {Component} from 'react';
import {Box, Heading, MenuButton} from 'grommet';
import {CoreLayout} from "./Layout/CoreLayout/CoreLayout";

class App extends Component {

    render() {

        return (
            <CoreLayout>

                <Box overflow={"scroll"} basis="full">
                    <Box flex justify="center" align="center">
                        Something Awesome is coming soon!
                    </Box>
                </Box>
            </CoreLayout>
        )
    }
}

export default App;
