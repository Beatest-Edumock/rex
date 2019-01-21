import React from 'react';
import {ShortListUI} from "./ShortListUI";
import {pushTestAttempts} from "../../_Redux/ActionCreators/TestAttempts-ActionCreator";
import {connect} from 'react-redux'
import {Box, Button, Text} from "grommet";
import {FilterBox, FilterResultProcessing} from "../../Common/FilterBox/FilterBox";


const columnDefinitions = {
    name: {columField: "name", columnText: "Name", type: "text"},
    score: {columField: "score", columnText: "Score", type: "text"},
};

class ShortList extends React.Component {


    constructor() {


        super();

    }


    render() {

        const pooop = this.shortListUI;

        const columns = [
            {
                id: 'name',
                Header: props => <Box>Name</Box>,
                accessor: d => d.user.full_name,
                filterMethod: (filter, row) => {
                    return new FilterResultProcessing([columnDefinitions.name]).predicate(row, filter.value);
                },
                Filter: ({filter, onChange}) =>
                    <FilterBox options={[columnDefinitions.name]} onCondition={onChange}/>,
                Footer: (props) => {
                    return <Text>Selected: {pooop && pooop.state.selection.length}</Text>
                }
            },
            {
                Header: props => <Text size={"xsmall"}>Section <br/> Cutoffs</Text>,
                columns: []
            },
            {
                id: 'score',
                Header: props => <Text size={"xsmall"}>Total <br/> Score</Text>,
                accessor: "score",
                filterMethod: (filter, row) => {
                    return new FilterResultProcessing([columnDefinitions.score]).predicate(row, filter.value);
                },
                Filter: ({filter, onChange}) =>
                    <FilterBox options={[columnDefinitions.score]} onCondition={onChange}/>,
                maxWidth: 45,
                Cell: props => <Box round="xsmall"
                                    basis="full"
                                    align="center"
                                    justify="center"
                                    pad={{horizontal: "small", vertical: "xsmall"}}
                                    background={props.value < 0 ? "status-critical" : "status-ok"}>
                    <Text textAlign="center" size="xsmall"> {props.value}</Text>
                </Box>
            }
        ];
        const columnsModified = columns.slice();

        if (this.props.testOverview.test_attempts.length > 0) {

            const sections = this.props.testOverview.sections;
            for (let i = 0; i < this.props.testOverview.test_attempts[0].section_attempts.length; i++) {

                //TODO: remove contains and !contains because it doesn't work for number values
                columnDefinitions[`$section_${i + 1}`] = {columField: `$section_${i + 1}`, columnText: `Section_${i + 1}`, type: "text"};
                columnsModified[1].columns.push({

                    Header: props => <Text>{i + 1} <br/> {sections[i].name}</Text>,
                    id: `$section_${i + 1}`,
                    accessor: d => {
                        return d.section_attempts[i].score
                    },
                    resizable: false,
                    // maxWidth: 45,
                    filterMethod: (filter, row) => {
                        return new FilterResultProcessing([columnDefinitions[`$section_${i + 1}`]]).predicate(row, filter.value);
                    },
                    Filter: ({filter, onChange}) =>
                        <FilterBox options={[columnDefinitions[`$section_${i + 1}`]]} onCondition={onChange}/>,
                    Cell: props => <Box round="xsmall"
                                        basis="full"
                                        align="center"
                                        justify="center"
                                        pad={{horizontal: "small", vertical: "xsmall"}}
                                        background={props.value < 0 ? "status-critical" : "status-ok"}>

                        <Text textalign="center" size="xsmall"> {props.value}</Text>

                    </Box>


                })


            }

        }

        columnsModified.push({

            Header: "Application Status",
            id: 'application_status',
            accessor: d => {
                return d.user.application.type;
            },
            resizable: true,

            Cell: props => (<Box round="xsmall"
                                 basis="full"
                                 align="center"
                                 justify="center"
                                 pad={{horizontal: "small", vertical: "xsmall"}}

                >

                    <Text textalign="center" size="xsmall"> {props.value}</Text>

                </Box>
            )


        });


        return (
            <div>
                <ShortListUI ref={r => (this.shortListUI = r)}
                             data={this.props.testOverview.test_attempts}
                             testName={this.props.testOverview.name}
                             isLoading={this.props.testOverview.name === undefined}
                             column_format={columnsModified.slice()}

                />
            </div>
        );
    }

}

function mapStateToProps(state, ownProps) {


    return {
        ...ownProps,
        testOverview: state.testOverview

    }

}


function mapDispatchToProps(dispatch) {

    return {
        addTestAttemptsOverview: (data) => {
            dispatch(pushTestAttempts(data));
        }
    }

}


let ShortListContainer = connect(mapStateToProps, mapDispatchToProps)(ShortList);


export {ShortListContainer};