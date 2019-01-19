import React from 'react';
import {ShortListUI} from "./ShortListUI";
import {pushTestAttempts} from "../../_Redux/ActionCreators/TestAttempts-ActionCreator";
import {connect} from 'react-redux'
import {Box, Text} from "grommet";


class ShortList extends React.Component {


    constructor() {


        super();

    }


    render() {
        const columns = [
            // {
            //     Header: "#",
            //     accessor: "id",
            //     maxWidth: 80,
            // },
            {
                id: 'name',
                Header: props => <Box>Name</Box>,
                accessor: d => d.user.full_name,
                filterMethod: (filter, row) => {
                    return row[filter.id].toLowerCase().includes(filter.value.toLowerCase());

                },
            },
            {
                Header: props => <Text size={"xsmall"}>Section <br/> Cutoffs</Text>,
                columns: []
            },
            {
                Header: props => <Text size={"xsmall"}>Total <br/> Score</Text>,
                accessor: "score",
                filterMethod: (filter, row) => {
                    return row[filter.id] >= filter.value;

                },
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
            for (let i = 0; i < this.props.testOverview.test_attempts[0].section_attempts.length; i++) {
                columnsModified[1].columns.push({

                    Header: `${i + 1}`,
                    id: `$section_${i + 1}`,
                    accessor: d => {
                        return d.section_attempts[i].score
                    },
                    resizable: false,
                    // maxWidth: 45,
                    filterMethod: (filter, row) => {
                        return row[filter.id] >= filter.value;

                    },
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


        return (
            <ShortListUI data={this.props.testOverview.test_attempts}
                         isLoading={this.props.testOverview.name === undefined}
                         column_format={columnsModified.slice()}

            />
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