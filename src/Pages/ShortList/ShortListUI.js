import React from 'react';
import {Box, DataTable, MenuButton} from 'grommet';
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
        accessor: "id"
    },
    {
        Header: props => <Box>Name</Box>,
        accessor: "name"
    },
    {
        Header: "Section 1 score",
        accessor: "section_1_score",
        Cell: props => <Box basis="full" fill pad={{horizontal: "small"}} background={props.value < 15 ? "status-critical" : "status-ok"}> {props.value}</Box>
    },
    {
        Header: "Section 2 score",
        accessor: "section_2_score",
        Cell: props => <Box basis="full" fill pad={{horizontal: "small"}} background={props.value < 15 ? "status-critical" : "status-ok"}> {props.value}</Box>
    },
    {
        Header: "Total Score",
        accessor: "total_score",
        Cell: props => <Box basis="full" fill pad={{horizontal: "small"}} background={props.value < 0 ? "status-critical" : "status-ok"}> {props.value}</Box>
    }
];

function ShortListUI() {
    return (

        <Box margin="small">

            <ReactTable filterable={true} data={arr} columns={columnsDiff}>
            </ReactTable>
        </Box>
    )
}

export {ShortListUI};
