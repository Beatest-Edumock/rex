import React from 'react';
import {ShortListUI} from "./ShortListUI";
import {getTestAttemptsOverviewAPI} from "../../_Api/Tests/TestAttempts/TestAttempts";
import {pushTestAttempts} from "../../_Redux/ActionCreators/TestAttempts-ActionCreator";
import {connect} from 'react-redux'
import {Box, Text} from "grommet";


class ShortList extends React.Component {


    constructor() {


        super();
        // getTestAttemptsOverviewAPI(105).then(({data}) => {
        //     this.props.addTestAttemptsOverview(data);
        //
        //     const columnsmodified = columns.slice();
        //
        //
        //     for (let i = 0; i < data[0].section_attempts.length; i++) {
        //         columnsmodified[2].columns.push({
        //
        //
        //             header: `${i + 1}`,
        //             id: `${i + 1}`,
        //             accessor: d => d.section_attempts[i].score,
        //             resizable: false,
        //             maxwidth: 45,
        //             cell: props => <box round="xsmall"
        //                                 basis="full"
        //                                 align="center"
        //                                 justify="center"
        //                                 pad={{horizontal: "small", vertical: "xsmall"}}
        //                                 background={props.value < 0 ? "status-critical" : "status-ok"}>
        //                 <text textalign="center" size="xsmall"> {props.value}</text>
        //
        //             </box>
        //
        //
        //         })
        //
        //
        //     }
        //
        //
        //     this.setState({
        //         tableData: data,
        //         column_format: columnsModified
        //     })
        //
        // });

    }


    render() {
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
        const columnsModified = columns.slice();

        console.log(this.props.testAttemptsOverview.length);

        if (this.props.testAttemptsOverview.length > 0) {
            for (let i = 0; i < this.props.testAttemptsOverview[0].section_attempts.length; i++) {
                columnsModified[2].columns.push({

                    Header: `${i + 1}`,
                    id: `${i + 1}`,
                    accessor: d => {
                        return d.section_attempts[i].score
                    },
                    resizable: false,
                    maxWidth: 45,

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
            <ShortListUI data={this.props.testAttemptsOverview}
                         column_format={columnsModified.slice()}

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