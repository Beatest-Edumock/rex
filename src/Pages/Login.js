import React from 'react';
import {Box, Button, FormField, Heading, TextInput} from "grommet";


function Login() {

    return (
        <Box direction="row" fill={true} background="light-2">

            <Box background={{color: "brand", opacity: "medium"}} align="center" basis="auto" direction="row" fill={true}>

                <Box basis="large"/>
                <Box fill={false} alignSelf="center" basis="auto" justify="stretch">
                    <img src="/img/beatest.png" style={{height: "auto", width: "100%"}}/>
                </Box>
                <Box basis="large"/>

            </Box>

            <Box justify="center"
                 fill="horizontal"
                 animation={["slideDown", "fadeIn"]}
                 basis="3/4"
                 border="left"
                 alignContent="stretch">
                <Heading alignSelf="center">Login </Heading>

                <form>
                    <Heading textAlign="center" level={5} color="status-critical"> Enter a valid email </Heading>

                    <FormField  error="Testing"/>
                    <FormField label='Email' error="Testing">
                        <TextInput/>
                    </FormField>

                    <FormField label='Password' error="Password must be 8 characters long">
                        <TextInput type="password"/>
                    </FormField>


                </form>
                <Box
                    direction="row"
                    justify="center">
                    <Button label="Login"/>
                </Box>

            </Box>
            {/*<Box basis="large"/>*/}

        </Box>
    )

}


export {Login};
