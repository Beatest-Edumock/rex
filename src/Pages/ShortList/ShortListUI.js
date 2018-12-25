import React from 'react';
import {Box, DataTable, MenuButton, Button, Text} from 'grommet';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {ShortListModal} from "./ShortListModal";

// let Chance = require('chance');
//
// let chance = Chance();
//
// const arr = Array(2000);
//
//
// for (let i = 0; i < arr.length; i++) {
//
//     const section_1_score = chance.integer({min: -10, max: 50});
//     const section_2_score = chance.integer({min: -10, max: 50});
//     const section_3_score = chance.integer({min: -10, max: 50});
//
//     arr[i] = {
//         name: chance.name(),
//         id: i + 1,
//         section_1_score: section_1_score,
//         section_2_score: section_2_score,
//         section_3_score: section_3_score,
//         total_score: section_1_score + section_2_score + section_3_score
//
//
//     }
//
// }


class ShortListUI extends React.Component {

    state = {data: [], isModalOpen: true};

    constructor(props) {
        super(props);


    }


    render() {
        return (
            <Box fill>
                {this.state.isModalOpen &&
                <ShortListModal
                    onClickOutside={() => {
                        this.setState(
                            {
                                ...this.state,
                                isModalOpen: false
                            }
                        )
                    }}/>
                }


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
                        data={this.props.data}
                        columns={this.props.column_format}>
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
}

export {ShortListUI};
