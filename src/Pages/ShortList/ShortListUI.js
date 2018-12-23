import React from 'react';
import {Box, DataTable, MenuButton, Button, Text} from 'grommet';
import ReactTable from 'react-table'
import 'react-table/react-table.css'


let Chance = require('chance');

let chance = Chance();

const arr = Array(2000);


for (let i = 0; i < arr.length; i++) {
    arr[i] = {
        name: chance.name(),
        id: i + 1,
        section_1_score: chance.integer({min: -10, max: 50}),
        section_2_score: chance.integer({min: -20, max: 30}),
        section_3_score: chance.integer({min: -10, max: 50}),
        total_score: chance.integer({min: -10, max: 30})


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
        Header: "Section Cutoffs",
        columns: [

            {
                Header: "1",
                Footer: "Count",
                accessor: "section_1_score",
                maxWidth: 70,
                Cell: props => <Box round="xsmall" basis="full" fill pad={{horizontal: "small"}}
                                    background={props.value < 15 ? "status-critical" : "status-ok"}>
                    <Text textAlign="end">{props.value}</Text></Box>
            },
            {
                Header: "2",
                accessor: "section_2_score",
                maxWidth: 70,
                Cell: props => <Box round="xsmall" basis="full" fill pad={{horizontal: "small"}}
                                    background={props.value < 15 ? "status-critical" : "status-ok"}>
                    <Text textAlign="end"> {props.value}</Text>
                </Box>
            },


        ]
    },
    {
        Header: "Total Score",
        accessor: "total_score",
        maxWidth: 70,
        Cell: props => <Box round="xsmall" basis="1/2" fill pad={{horizontal: "small"}} background={props.value < 0 ? "status-critical" : "status-ok"}>
            <Text textAlign="end"> {props.value}</Text>
        </Box>
    }
];

function ShortListUI() {
    return (

        <Box fill>
            <Box height={"90%"}>

                <ReactTable filterable={true} data={arr} columns={columnsDiff}>
                </ReactTable>
            </Box>

            <Box margin="small" gap="medium" basis={"auto"} direction="row-responsive" justify="center">
                <Button color="status-warning" label={"Wait-List"}/>
                <Button color="status-critical" label={"Reject"}/>
                <Button color="status-ok" label={"Approve"}/>
            </Box>
        </Box>
    )
}

export {ShortListUI};
