import React from 'react';
import {SingleFormPage} from "../../Layout/SingleFormPage/SingleFormPage";
import {Anchor, Box, Button, FormField, Text, TextInput} from "grommet";


class SignupPageUI extends React.Component {


    render() {
        return (
            <SingleFormPage title={"Create Account"}>
                <form>

                    <FormField label='Name'>
                        <TextInput type="name"/>
                    </FormField>

                    <FormField label='Email'>
                        <TextInput type="email"/>
                    </FormField>
                    <FormField label='Password'>
                        <TextInput type="password"/>
                    </FormField>
                    <FormField label='Confirm Password'>
                        <TextInput type="password"/>
                    </FormField>

                    <br/>
                    <br/>

                    <FormField label='Corporate Name'>
                        <TextInput type="corporate_name"/>
                    </FormField>

                    <Box
                        direction="row"
                        justify="center">
                        <Button margin="medium" label="Sign Up"/>
                    </Box>
                </form>

                <Anchor alignSelf="center" href="/"><Text size="small">Already have an account?</Text> Login </Anchor>

            </SingleFormPage>
        )
    }

}

export {SignupPageUI};