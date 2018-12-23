import React from 'react';

import {Anchor, Box, Heading} from "grommet";

class SingleFormPage extends React.Component {


    render() {

        return (<Box direction="row" fill={true} background="light-1">

            <Box background={{color: "brand", opacity: "medium"}} align="center" basis="auto" direction="row" fill={true}>

                <Box basis="large"/>

                <Box fill={false} alignSelf="center" basis="auto" justify="stretch">
                    <Anchor alignSelf="center" icon={(<img src="/img/beatest.png" style={{height: "auto", width: "100%"}}/>)}>
                    </Anchor>
                </Box>
                <Heading textAlign="center" level={3}>Corporate</Heading>
                <Box basis="large"/>

            </Box>

            <Box
                justify="center"
                animation={["slideDown", "fadeIn"]}
                overflow="auto"
                basis="3/4"
                border={{side: "left", color: "dark-1", size: "medium"}}
            >
                <Heading alignSelf="center">{this.props.title} </Heading>

                {this.props.children}


            </Box>

        </Box>)
    }

}


export {SingleFormPage};