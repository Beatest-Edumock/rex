import React, {Component} from 'react';

import {Apps, ContactInfo, Cursor, Servers as ServersIcon, User} from 'grommet-icons';
import {Box, Button, RoutedButton, Collapsible, Grommet, Heading, Menu, MenuButton, Text} from 'grommet';

import {theme} from "../../__theme/theme";
import {AppBar} from "../../Common/AppBar";


/**
 * This Component displays the App Bar and the sidebar.
 *
 * Since the sidebar is toggled using buttons at the app bar, it is easier to have them
 * both be at the same place and access the same state.
 *
 *
 * All children passed to this prop will be displayed in the content ("main") area.
 */
class CoreLayout extends Component {
    state = {
        showSidebar: true,
    };

    render() {
        const {showSidebar} = this.state;

        return (
            <Grommet full theme={theme}>
                <Box fill>

                    <AppBar>

                        <Box justify="left">

                            <Button
                                alignSelf="start"
                                icon={<Apps/>}
                                onClick={() => this.setState({showSidebar: !this.state.showSidebar})}
                            />
                        </Box>

                        {/*This can be refactored to connect to redux store later*/}
                        <Box margin={{horizontal: "medium"}}>
                            <Heading level='2' margin='none'>Syntel, Inc.</Heading>
                        </Box>


                        <Box flex overflow="auto">
                        </Box>


                        {/*This can be refactored to connect to redux store later*/}
                        <Menu
                            label="Harshvardhan Gupta"
                            size="small"
                            icon={<User/>}
                            dropBackground="dark-1"
                            items={[
                                {
                                    label: "Logout", onClick: () => {
                                    }
                                }
                            ]}
                        />

                        <Box margin={{horizontal: "medium"}}>
                            <Heading level='6' margin='none' color="light-4" size="small">Beatest<sup>C</sup> </Heading>
                        </Box>


                    </AppBar>

                    <Box direction='row' flex size="full">
                        <Collapsible direction="horizontal" open={showSidebar}>
                            <Box flex
                                 background='light-2'
                                 elevation='medium'
                                 width="xsmall">

                                {/*Below are the different core areas that the user can navigate to*/}
                                <Box gap="xsmall"
                                     align="center"
                                     margin='small'
                                     textAlign="end">

                                    <RoutedButton path="/shortlist" hoverIndicator>
                                        <ServersIcon size="medium"/>
                                    </RoutedButton>
                                    <Text size="xsmall" textAlign="center" style={{textAlign: 'center'}}>ShortList</Text>
                                </Box>


                                <Box
                                    gap="xsmall"
                                    align="center"
                                    margin='small'
                                    textAlign="end"
                                >
                                    <RoutedButton path="/profile-analysis" hoverIndicator>
                                        <ContactInfo size="medium"/>
                                    </RoutedButton>

                                    <Text size="xsmall" textAlign="center">Profile Analysis </Text>
                                </Box>


                                {/*The "demo" page is pushed all the way to the bottom*/}
                                <Box flex overflow="auto">
                                </Box>

                                <Box
                                    gap="xsmall"
                                    alignContent="stretch"
                                    alignSelf="stretch"
                                    align="center"
                                    margin='small'
                                >
                                    <RoutedButton path="/demo" hoverIndicator>
                                        <Cursor size="medium"/>
                                    </RoutedButton>
                                    <Text size="xsmall" alignSelf="center" textAlign={"center"}>Demo</Text>
                                </Box>
                            </Box>
                        </Collapsible>

                        {this.props.children}
                    </Box>
                </Box>
            </Grommet>
        );
    }
}

export {CoreLayout};
