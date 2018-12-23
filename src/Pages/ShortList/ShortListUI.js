import React from 'react';
import {Box, DataTable, MenuButton, Button, Text} from 'grommet';
import ReactTable from 'react-table'
import 'react-table/react-table.css'


let Chance = require('chance');

let chance = Chance();

const arr = Array(2000);


for (let i = 0; i < arr.length; i++) {

    const section_1_score = chance.integer({min: -10, max: 50});
    const section_2_score = chance.integer({min: -10, max: 50});
    const section_3_score = chance.integer({min: -10, max: 50});

    arr[i] = {
        name: chance.name(),
        id: i + 1,
        section_1_score: section_1_score,
        section_2_score: section_2_score,
        section_3_score: section_3_score,
        total_score: section_1_score + section_2_score + section_3_score


    }

}

console.log(arr);

const columns = [
    {
        property: "id",
        header: <Box>#</Box>,
        primary: true,
    },
    {
        property: "name",
        header: <Box>Name</Box>,
    },
    // {
    //     header: <Box>Section 1 score</Box>,
    //     property: "section_1_score",
    //     render: datum => {
    //         return (<Box basis={"full"} fill pad={{horizontal: "small"}} background={'status-critical'}>{datum.section_1_score}</Box>)
    //     },
    //     search:true
    //
    // }
];

const columnsDiff = [
    {
        Header: "#",
        accessor: "id",
        maxWidth: 80,
    },
    {
        Header: props => <Box>Name</Box>,
        accessor: "name",
    },
    {
        Header: props => <Text size={"xsmall"}>Section <br/> Cutoffs</Text>,
        columns: [

            {
                Header: "1",
                accessor: "section_1_score",
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
            },
            {
                Header: "2",
                accessor: "section_2_score",
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
            },
            {
                Header: "3",
                accessor: "section_3_score",
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
            },


        ]
    },
    {
        Header: props => <Text size={"xsmall"}>Total <br/> Score</Text>,
        accessor: "total_score",
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

function ShortListUI() {
    return (

        <Box fill>
            <Box height={"90%"} margin={'small'}>
                <ReactTable
                    className="-highlight -striped"
                    getTdProps={(state, rowInfo, column, instance) => {
                        return {
                            onClick: (e, handleOriginal) => {
                                console.log("A Td Element was clicked!");
                                console.log("it produced this event:", e);
                                console.log("It was in this column:", column);
                                console.log("It was in this row:", rowInfo);
                                console.log("It was in this table instance:", instance);

                                // IMPORTANT! React-Table uses onClick internally to trigger
                                // events like expanding SubComponents and pivots.
                                // By default a custom 'onClick' handler will override this functionality.
                                // If you want to fire the original onClick handler, call the
                                // 'handleOriginal' function.
                                if (handleOriginal) {
                                    handleOriginal();
                                }
                            }
                        };
                    }
                    }


                    filterable={true}
                    data={arr}
                    columns={columnsDiff}>
                </ReactTable>
            </Box>

            <Box margin="small" gap="medium" basis={"auto"} direction="row-responsive" justify="center">
                <Button primary color="status-critical" label={"Reject"}/>
                <Button primary color="status-warning" label={"Wait-List"}/>
                <Button primary color="status-ok" label={"Approve"}/>
            </Box>
        </Box>
    )
}

export {ShortListUI};
