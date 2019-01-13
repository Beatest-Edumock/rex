import React from 'react'
import {Box, Calendar, Heading, Layer, Select, Text} from "grommet";


class ShortListModalUI extends React.Component {

    state = {
        value: [],
        options: this.props.corporateTests
    };


    render() {
        const {options, selected, value} = this.state;


        const sortedDates = this.props.testDates.sort((a, b) => {

            return new Date(b) - new Date(a);
        });

        const bounds = [sortedDates[sortedDates.length - 1], sortedDates[0]];


        return (
            <Layer position='center' onClickOutside={() => {
                this.props.onClickOutside()
            }}>
                <Box round="small" align="center">
                    <Box background="light-1"
                         round="small"
                         basis="full"
                         height="large"
                         width="large"
                         justify="start"
                    >
                        <Heading textAlign="center" level={2}>Select Exam</Heading>

                        <Box margin="large">

                            <Select options={this.state.options}
                                    selected={selected}
                                    value={value}
                                    onSearch={(searchText) => {
                                        const regexp = new RegExp(searchText, 'i');
                                        this.setState((prevState) => {
                                                return {
                                                    ...prevState,
                                                    options: prevState.options.filter(o => o.match(regexp))
                                                }
                                            }
                                        );
                                    }}

                                    onChange={event => {
                                        this.setState({
                                            value: event.value,
                                            selected: event.selected,
                                            options: this.state.options,
                                        });

                                        this.props.onSelectCallback(event.selected);
                                        this.props.onClickOutside();
                                    }
                                    }

                                    options={options}

                            />
                        </Box>




                        {/*The commented lines below are responsible for date selection.*/}

                        {/*<Box*/}
                            {/*alignSelf="center"*/}
                        {/*>*/}
                            {/*<Heading*/}
                                {/*textAlign="center"*/}
                                {/*color="dark-4"*/}
                                {/*level={3}>*/}
                                {/*Select Exam Date</Heading>*/}






                            {/*<Box border="small"*/}
                                 {/*round="small"*/}
                                 {/*pad="small"*/}
                            {/*>*/}
                                {/*Calendar is disabled for the time being*/}


                                {/*<Calendar*/}
                                    {/*dates={this.props.testDates}*/}

                                    {/*animate={false}*/}

                                    {/*onSelect={(date) => {*/}

                                        {/*// date.setHours(0, 0, 0, 0);*/}
                                        {/*console.log(new Date(date).setHours(0, 0, 0, 0));*/}


                                        {/*const result = this.props.testDates.find((elem) => {*/}
                                            {/*elem = new Date(elem);*/}
                                            {/*elem.setHours(0, 0, 0, 0);*/}

                                            {/*const selectedDate = new Date(date);*/}
                                            {/*selectedDate.setHours(0, 0, 0, 0);*/}

                                            {/*return selectedDate.getTime() === elem.getTime();*/}

                                        {/*});*/}
                                        {/*if (result) {*/}
                                            {/*date = new Date(date);*/}
                                            {/*date.setHours(0, 0, 0, 0);*/}

                                            {/*this.props.onDateSelectCallback(date.toISOString());*/}
                                            {/*this.props.onClickOutside();*/}
                                        {/*}*/}


                                    {/*}}*/}
                                {/*/>*/}
                            {/*</Box>*/}

                        {/*</Box>*/}

                    </Box>
                </Box>
            </Layer>
        )
    }


}

export {ShortListModalUI};