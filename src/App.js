import React, {Component} from 'react';
import {Box, Grommet, MenuButton, grommet} from 'grommet';
import {CoreLayout} from "./Layout/CoreLayout/CoreLayout";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ShortList} from "./Pages/ShortList";
import {ProfileAnalysis} from "./Pages/ProfileAnalysis";
import {Login} from "./Pages/Login";
import {theme} from "./__theme/theme";


function NotFound() {
    return <Box>Not Found</Box>
}


function CoreLayoutWrapper() {

    return (

        <CoreLayout>

            <Box overflow={"scroll"} basis="full">

                <Switch>
                    <Route path="/shortlist" exact component={ShortList}/>
                    <Route path="/profile-analysis" exact component={ProfileAnalysis}/>
                    <Route component={NotFound}/>
                </Switch>
            </Box>
        </CoreLayout>
    )

}

class App extends Component {

    render() {

        return (
            <Grommet full theme={theme}>
                <Router>
                    <React.Fragment>
                        <Switch>
                            <Route path="/Login" exact component={Login}/>
                            <Route path="/shortlist" exact component={CoreLayoutWrapper}/>
                            <Route path="/profile-analysis" exact component={CoreLayoutWrapper}/>
                            <Route component={NotFound}/>
                        </Switch>

                    </React.Fragment>
                </Router>
            </Grommet>
        )
    }
}

export default App;
