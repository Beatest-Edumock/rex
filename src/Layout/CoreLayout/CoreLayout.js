import React, {Component} from 'react';

import {Apps, ContactInfo, Cursor, Servers as ServersIcon, User} from 'grommet-icons';
import {Box, Button, RoutedButton, Collapsible, Grommet, Heading, Menu, MenuButton, Text} from 'grommet';

import {theme} from "../../__theme/theme";
import {AppBar} from "../../Common/AppBar";

import { matchPath } from "react-router-dom";
import {withRouter} from 'react-router-dom';


/**
 * This Component displays the App Bar and the sidebar.
 *
 * Since the sidebar is toggled using buttons at the app bar, it is easier to have them
 * both be at the same place and access the same state.
 *
 *
 * All children passed to this prop will be displayed in the content ("main") area.
 */
class CoreLayoutWithRouter extends Component {
    state = {
        showSidebar: true,
    };

    render() {

        console.log(this.props.location.pathname);
        const {showSidebar} = this.state;

        return (
            <Grommet full theme={theme}>
                <Box fill>
                    {this.context.router}

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
                                <RoutedButton active={"/shortlist" === this.props.location.pathname}  path="/shortlist" hoverIndicator>
                                    <Box
                                        pad={{vertical: "small"}}
                                        gap="xsmall"
                                        align="center"
                                        justify="center"
                                    >
                                        <ServersIcon size="medium"/>
                                        <Text size="xsmall" alignSelf="center" textAlign={"center"}>ShortList</Text>
                                    </Box>
                                </RoutedButton>


                                <RoutedButton active={"/profile-analysis" ===this.props.location.pathname}   path="/profile-analysis" hoverIndicator>
                                    <Box
                                        pad={{vertical: "small"}}
                                        gap="xsmall"
                                        align="center"
                                        justify="center"
                                    >
                                        <ContactInfo size="medium"/>
                                        <Text size="xsmall" alignSelf="center" textAlign={"center"}>Profile Analysis</Text>
                                    </Box>
                                </RoutedButton>


                                {/*The "demo" page is pushed all the way to the bottom*/}
                                <Box flex overflow="auto">
                                </Box>

                                <Box
                                    gap="xsmall"
                                    alignContent="stretch"
                                    alignSelf="stretch"
                                    align="stretch"
                                    margin='none'
                                >
                                    <RoutedButton active={"/demo" ===this.props.location.pathname}  path="/demo" hoverIndicator>
                                        <Box
                                            pad={{vertical: "small"}}
                                            gap="xsmall"
                                            align="center"
                                            justify="center"
                                        >
                                            <Cursor size="medium"/>
                                            <Text size="xsmall" alignSelf="center" textAlign={"center"}>Demo</Text>
                                        </Box>
                                    </RoutedButton>
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

export const CoreLayout = withRouter(CoreLayoutWithRouter);
