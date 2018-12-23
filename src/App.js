import React, {Component} from 'react';
import {Box, Grommet, MenuButton} from 'grommet';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ProfileAnalysis} from "./Pages/ProfileAnalysis";
import {theme} from "./__theme/theme";
import {LoginPage} from "./Pages/LoginPage";
import {NotFoundPage} from "./Pages/404Page/404Page";
import {SignupPage} from "./Pages/SignupPage";
import {setUpApp} from "./setUp";
import {initStore} from "./_Redux/initStore";
import {Provider} from 'react-redux'
import {ShortList} from "./Pages/ShortList";
import {CoreLayout} from "./Layout/CoreLayout";
import {GetStartedUI} from "./Pages/GetStarted";


setUpApp();
let store = initStore();


function NotFound() {
    return <Box>Not Found</Box>
}


function CoreLayoutWrapper() {

    return (

        <CoreLayout>

            <Box overflow={"scroll"} basis="full">

                <Switch>
                    <Route path="/get-started" exact component={GetStartedUI}/>
                    <Route path="/shortlist" exact component={ShortList}/>
                    <Route path="/profile-analysis" exact component={ProfileAnalysis}/>
                </Switch>
            </Box>
        </CoreLayout>
    )

}

class App extends Component {

    render() {

        return (

            <Provider store={store}>
                <Grommet full theme={theme}>
                    <Router>
                        <Switch>
                            <Route path="/" exact component={LoginPage}/>
                            <Route path="/signup" exact component={SignupPage}/>

                            <Route path="/shortlist" exact component={CoreLayoutWrapper}/>
                            <Route path="/get-started" exact component={CoreLayoutWrapper}/>
                            <Route path="/profile-analysis" exact component={CoreLayoutWrapper}/>

                            <Route component={NotFoundPage}/>
                        </Switch>

                    </Router>
                </Grommet>
            </Provider>
        )
    }
}

export default App;
