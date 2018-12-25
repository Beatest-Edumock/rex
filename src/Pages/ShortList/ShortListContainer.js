import React from 'react';
import {ShortListUI} from "./ShortListUI";
import {getTestAttemptsOverviewAPI} from "../../_Api/Tests/TestAttempts/TestAttempts";
import {pushTestAttempts} from "../../_Redux/ActionCreators/TestAttempts-ActionCreator";
import {connect} from 'react-redux'
import {Box, Text} from "grommet";

const columns = [
    {
        Header: "#",
        accessor: "id",
        maxWidth: 80,
    },
    {
        id: 'name',
        Header: props => <Box>Name</Box>,
        accessor: d => d.user.full_name,
    },
    {
        Header: props => <Text size={"xsmall"}>Section <br/> Cutoffs</Text>,
        columns: []
    },
    {
        Header: props => <Text size={"xsmall"}>Total <br/> Score</Text>,
        accessor: "score",
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


class ShortList extends React.Component {


    state = {
        tableData: [],
        column_format: columns
    };

    constructor() {


        super();
        getTestAttemptsOverviewAPI(105).then(({data}) => {
            this.props.addTestAttemptsOverview(data);

            const columnsModified = columns;
            console.log(columnsModified[2]);


            for (let i = 0; i < data[0].section_attempts.length; i++) {
                columnsModified[2].columns.push({


                    Header: `${i + 1}`,
                    id: `${i + 1}`,
                    accessor: d => d.section_attempts[i].score,
                    resizable: false,
                    maxWidth: 45,
                    Cell: props => <Box round="xsmall"
                                        basis="full"
                                        align="center"
                                        justify="center"
                                        pad={{horizontal: "small", vertical: "xsmall"}}
                                        background={props.value < 0 ? "status-critical" : "status-ok"}>
                        <Text textAlign="center" size="xsmall"> {props.value}</Text>

                    </Box>


                })


            }


            this.setState({
                ...this.state,
                tableData: data,
                column_format: columnsModified
            })

        });

    }


    render() {
        return (
            <ShortListUI data={this.state.tableData}
                         column_format={this.state.column_format}

            />
        );
    }

}

function mapStateToProps(state, ownProps) {


    return {
        ...ownProps,
        testAttemptsOverview: state.testAttemptsOverview

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