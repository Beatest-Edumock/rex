import React from 'react';
import {Box, Button, MenuButton} from 'grommet';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {ShortListModal} from "./ShortListModal";


class ShortListUI extends React.Component {

    state = {isModalOpen: true};

    constructor(props) {
        super(props);


    }


    render() {


        return (

            <Box fill overflow="scroll">
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
                    <Box>


                        <ReactTable
                            className="-highlight -striped"
                            loading={this.props.isLoading}
                            onFetchData={(state, instance) => {
                                //console.log(state.filtered);
                            }
                            }

                            getTdProps={(state, rowInfo, column, instance) => {
                                return {
                                    onClick: (e, handleOriginal) => {
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

                            {(state, makeTable, instance) => {
                                // console.log(JSON.stringify(state));
                                //console.log(JSON.stringify(state.sortedData));
                                return (

                                    makeTable()
                                );
                            }}


                        </ReactTable>
                    </Box>
                </Box>

                <Box margin="small" gap="medium" fill={"horizontal"} direction="row-responsive" justify="center">

                    <Box align="start" basis="1/3">
                        <Button align="start" alignSelf={"start"} label={"Change Test"} onClick={() => {
                            this.setState({
                                ...this.state,
                                isModalOpen: true
                            })
                        }}/>
                    </Box>

                    <Box basis="2/3" direction='row' gap="medium">
                        <Box align="end" basis="1/2"/>
                        <Box align="end" alignContent="stretch" gap="medium" direction="row">
                            <Button primary color="status-ok" label={"Approve"}/>
                            <Button primary color="status-critical" label={"Reject"}/>
                            <Button primary color="status-warning" label={"Wait-List"}/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }
}

export {ShortListUI};
