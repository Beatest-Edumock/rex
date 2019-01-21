import React from 'react';
import {Box, Button, MenuButton, Text} from 'grommet';
import Reacttable from 'react-table'
import 'react-table/react-table.css'
import {ShortListModal} from "./ShortListModal";
import selectTable from "react-table/lib/hoc/selectTable";
import {UpdateApplicationStatusButtonsUI} from "./UpdateApplicationStatusButtons/UpdateApplicationStatusButtonsUI";
import {UpdateApplicationStatusButtons} from "./UpdateApplicationStatusButtons";

const ReactTable = selectTable(Reacttable);


class ShortListUI extends React.Component {

    state = {
        isModalOpen: true,
        selectAll: false,
        selection: []
    };


    constructor(props) {
        super(props);

    }

    getSelectedUserIds() {
        return this.state.selection;
    }


    isSelected = key => {
        /*
          Instead of passing our external selection state we provide an 'isSelected'
          callback and detect the selection state ourselves. This allows any implementation
          for selection (either an array, object keys, or even a Javascript Set object).
        */
        return this.state.selection.includes(key);
    };


    toggleSelection = (key, shift, row) => {
        /*
          Implementation of how to manage the selection state is up to the developer.
          This implementation uses an array stored in the component state.
          Other implementations could use object keys, a Javascript Set, or Redux... etc.
        */
        // start off with the existing state
        let selection = [...this.state.selection];
        const keyIndex = selection.indexOf(key);
        // check to see if the key exists
        if (keyIndex >= 0) {
            // it does exist so we will remove it using destructing
            selection = [
                ...selection.slice(0, keyIndex),
                ...selection.slice(keyIndex + 1)
            ];
        } else {
            // it does not exist so add it
            selection.push(key);
        }
        // update the state
        this.setState({selection});
    };


    toggleAll = () => {
        /*
          'toggleAll' is a tricky concept with any filterable table
          do you just select ALL the records that are in your data?
          OR
          do you only select ALL the records that are in the current filtered data?

          The latter makes more sense because 'selection' is a visual thing for the user.
          This is especially true if you are going to implement a set of external functions
          that act on the selected information (you would not want to DELETE the wrong thing!).

          So, to that end, access to the internals of ReactTable are required to get what is
          currently visible in the table (either on the current page or any other page).

          The HOC provides a method call 'getWrappedInstance' to get a ref to the wrapped
          ReactTable and then get the internal state and the 'sortedData'.
          That can then be iterrated to get all the currently visible records and set
          the selection state.
        */
        const selectAll = this.state.selectAll ? false : true;
        const selection = [];
        if (selectAll) {
            // we need to get at the internals of ReactTable
            const wrappedInstance = this.checkboxTable.getWrappedInstance();
            // the 'sortedData' property contains the currently accessible records based on the filter and sort
            const currentRecords = wrappedInstance.getResolvedState().sortedData;
            // we just push all the IDs onto the selection array
            currentRecords.forEach(item => {
                selection.push(item._original.id);
            });
        }
        this.setState({selectAll, selection});
    };


    render() {


        const checkboxProps = {
            selectAll: this.state.selectAll,
            isSelected: this.isSelected,
            toggleSelection: this.toggleSelection,
            toggleAll: this.toggleAll,
            selectType: "checkbox",
        };


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


                <Box height={"90%"} margin={'none'}>
                    <Text align="center" textAlign="center">{this.props.testName}</Text>
                    <Box>


                        <ReactTable
                            {...checkboxProps}
                            ref={r => (this.checkboxTable = r)}
                            className="-highlight -striped"
                            keyField="id"
                            loading={this.props.isLoading}
                            onFetchData={(state, instance) => {
                                //console.log(state.filtered);
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

                <Box margin={{top: "small", bottom: "small"}} gap="medium" fill={"horizontal"} direction="row-responsive" justify="center">

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
                            {/*<Button primary color="status-ok" label={"Approve"} onClick={() => {*/}
                            {/*}}/>*/}
                            <UpdateApplicationStatusButtons selectedApplicants={this.state.selection}/>

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
