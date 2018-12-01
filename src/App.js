import React, {Component} from 'react';
import {Box, Heading, MenuButton} from 'grommet';
import {CoreLayout} from "./Layout/CoreLayout/CoreLayout";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ShortList} from "./Pages/ShortList";
import {ProfileAnalysis} from "./Pages/ProfileAnalysis";


function NotFound() {
    return <Box>Not Found</Box>
}

class App extends Component {

    render() {

        return (
            <Router>
                <CoreLayout>

                    <Box overflow={"scroll"} basis="full">

                        <Switch>
                            <Route path="/shortlist" exact component={ShortList}/>
                            <Route path="/profile-analysis" exact component={ProfileAnalysis}/>
                            <Route component={NotFound}/>

                        </Switch>
                    </Box>
                </CoreLayout>
            </Router>
        )
    }
}

export default App;
