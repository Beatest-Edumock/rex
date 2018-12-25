import React from 'react'
import {ShortListModalUI} from "./ShortListModalUI";
import {connect} from 'react-redux';
import {getTestAttemptDatesAPI, getTestAttemptsOverviewAPI} from "../../../_Api/Tests/TestAttempts/TestAttempts";
import {pushTestAttempts} from "../../../_Redux/ActionCreators/TestAttempts-ActionCreator";


class ShortListModal extends React.Component {

    state = {
        selectedTestIdx: -1,
        testDates: []
    };


    constructor() {
        super();
        this.onTestSelectCallback = this.onTestSelectCallback.bind(this);
        this.onDateSelectCallback = this.onDateSelectCallback.bind(this);
    }

    onDateSelectCallback(selectedDate) {
        this.props.addTestAttemptsOverview([]);

        getTestAttemptsOverviewAPI(this.props.user.corporate.tests[this.state.selectedTestIdx].id).then(({data}) => {
            this.props.addTestAttemptsOverview(data);

        });


    }

    /**
     * Callback to be fired when an option is selected
     *
     * @param selectedTestIdx the index of the option selected.
     * The array that is passed is props.user.corporate.tests
     */
    onTestSelectCallback(selectedTestIdx) {
        this.setState({...this.state, selectedTestIdx});

        const testId = this.props.user.corporate.tests[selectedTestIdx].id;

        getTestAttemptDatesAPI(testId).then(({data}) => {
            this.setState({
                ...this.state,
                testDates: data
            })

        })
    }

    render() {


        return (
            <ShortListModalUI
                onClickOutside={this.props.onClickOutside}

                corporateTests={this.props.user.corporate.tests.map((elem) => {
                    return elem.name
                })}
                testDates={this.state.testDates.map((el) => el.date)}
                onSelectCallback={this.onTestSelectCallback} // when a test is selected from dropdown

                onDateSelectCallback={this.onDateSelectCallback}
            />
        )
    }


}


function mapStateToProps(state, ownProps) {


    return {
        ...ownProps,
        user: state.user

    }

}


function mapDispatchToProps(dispatch) {

    return {

        addTestAttemptsOverview: (data) => {
            dispatch(pushTestAttempts(data));
        }
    }

}


let ShortListModalContainer = connect(mapStateToProps, mapDispatchToProps)(ShortListModal);


export {ShortListModalContainer};