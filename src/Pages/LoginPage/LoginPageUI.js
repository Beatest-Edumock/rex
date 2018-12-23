import React from 'react';
import {SingleFormPage} from "../../Layout/SingleFormPage/SingleFormPage";
import {Anchor, Layer, Box, Button, FormField, Heading, Text, TextInput} from "grommet";
import {RingLoader} from 'react-spinners';
import {Formik} from "formik";
import * as yup from 'yup';


const schema = yup.object().shape({

    email: yup.string().email().required(),
    password: yup.string().min(6).max(9).required()
});

class LoginPageUI extends React.Component {


    render() {
        return (
            <SingleFormPage title={"Login"}>

                {this.props.loading &&
                <Layer position='center'>
                    <Box round="small" align="center">
                        <RingLoader size={99} color={"#4A90E2"}/>
                    </Box>
                </Layer>
                }


                <Formik
                    initialValues={{email: '', password: '', info: ''}}

                    validationSchema={schema}

                    onSubmit={this.props.onSubmitCallback}

                    render={

                        ({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,}) => (

                            <React.Fragment>
                                <Heading alignSelf="center" level={4} color="status-critical">{errors.info}</Heading>

                                <form onSubmit={event => {
                                    event.preventDefault();
                                }}>

                                    <FormField label='Email' error={touched.email && errors.email && errors.email}>
                                        <TextInput name="email" type="email"
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   value={values.email}

                                        />
                                    </FormField>

                                    <FormField label='Password' error={touched.password && errors.password && errors.password}>
                                        <TextInput name='password' type="password"
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   value={values.password}
                                        />
                                    </FormField>

                                    <Box
                                        direction="row"
                                        justify="center">


                                        <Button disabled={isSubmitting}
                                                label="Login" margin={"medium"}
                                                onClick={() => {
                                                    handleSubmit()
                                                }} type='submit'/>


                                    </Box>
                                </form>

                                <Anchor
                                    alignSelf="center"
                                    href="/signup"> < Text size="small"> Dont have an Account yet?</Text> Create Account</Anchor>
                            </React.Fragment>

                        )


                    }


                />


            </SingleFormPage>
        )
    }

}

export {LoginPageUI};