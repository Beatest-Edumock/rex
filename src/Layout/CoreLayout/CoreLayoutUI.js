import React, {Component} from 'react';

import {ContactInfo, Cursor, Menu as Hamburger, Servers as ServersIcon, User} from 'grommet-icons';
import {Box, Button, Collapsible, Heading, Menu, MenuButton, RoutedButton, Text} from 'grommet';
import {AppBar} from "../../Common/AppBar";
import {logoutUserApi} from "../../_Api/User";

import {withRouter} from "react-router-dom";
import {LoadingSpinner} from "../../Common/LoadingSpinner";


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
        console.log(this.props.user);

        const {showSidebar} = this.state;

        if (this.props.user === 'loading') {
            return (<LoadingSpinner/>);
        }

        return (


            <Box fill animation={"fadeIn"}>
                {this.context.router}


                <AppBar>

                    <Box justify="left">

                        <Button
                            alignSelf="start"
                            icon={<Hamburger color='light-1'/>}
                            onClick={() => this.setState({showSidebar: !this.state.showSidebar})}
                        />
                    </Box>

                    <Box margin={{horizontal: "medium"}}>
                        <Heading level='3' margin='none' color={'neutral-1'}>{this.props.user.corporate.name}</Heading>
                    </Box>


                    <Box flex overflow="auto">
                    </Box>

                    {/*This can be refactored to connect to redux store later*/}
                    <Menu
                        label={this.props.user.full_name}
                        size="small"
                        icon={<User/>}
                        dropBackground="dark-1"
                        items={[
                            {
                                label: "Logout", onClick: () => {

                                    logoutUserApi().then(() => {
                                        this.props.history.push("/");
                                        this.props.addUserAction(null);

                                    })
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
                            <RoutedButton id="shortlist-menu-btn" active={"/shortlist" === this.props.location.pathname} path="/shortlist" hoverIndicator>
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


                            <RoutedButton id="analysis-menu-btn" active={"/profile-analysis" === this.props.location.pathname} path="/profile-analysis" hoverIndicator>
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
                                <RoutedButton id="demo-menu-btn" active={"/demo" === this.props.location.pathname} path="/demo" hoverIndicator>
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
        );
    }
}

export const CoreLayoutUI = withRouter(CoreLayoutWithRouter);
