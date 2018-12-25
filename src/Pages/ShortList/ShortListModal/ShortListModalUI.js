import React from 'react'
import {Box, Calendar, Heading, Layer, Select, Text} from "grommet";


class ShortListModalUI extends React.Component {

    state = {
        value: [],
        options: this.props.corporateTests
    };


    render() {
        const {options, selected, value} = this.state;

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
                                    }
                                    }

                                    options={options}

                            />
                        </Box>

                        <Box
                            alignSelf="center"
                        >
                            <Heading
                                textAlign="center"
                                color="dark-4"
                                level={3}>
                                Select Exam Date</Heading>
                            <Box border="small"
                                 round="small"
                                 pad="small"
                            >
                                <Calendar
                                    dates={this.props.testDates}
                                    animate={false}
                                    onSelect={() => {
                                    }}
                                />
                            </Box>

                        </Box>

                    </Box>
                </Box>
            </Layer>
        )
    }


}

export {ShortListModalUI};