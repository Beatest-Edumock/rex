import React from 'react';

import {TrialPageUI} from "./TrialPageUI";
import {getTestsAPI} from "../../_Api/Tests/Tests";

class TrialPageContainer extends React.Component {


    state = {tests: []};

    componentDidMount() {
        getTestsAPI().then(({data}) => {
            this.setState({tests: data})
        });


    }


    render() {


        return (
            <TrialPageUI tests={this.state.tests}/>
        )
    }

}

export {TrialPageContainer}