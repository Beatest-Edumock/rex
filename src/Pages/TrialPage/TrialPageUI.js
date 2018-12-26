import React from 'react';
import {SingleFormPage} from "../../Layout/SingleFormPage/SingleFormPage";
import {Anchor, Grid, Box, Button, FormField, Text, TextInput, Heading} from "grommet";
import {Attraction, Car} from "grommet-icons";


class TrialPageUI extends React.Component {


    render() {
        return (


            <Box pad="small" gap="small">

                <Box fill="horizontal" pad={{bottom:"xlarge"}} align="center">
                    <Heading align="center"
                             level={2}
                             textAlign="center"> Take some trial exams</Heading>
                </Box>

                <Grid columns="small" rows="small" gap="small" alignContent="center">

                    {this.props.tests.map(
                        (el) => {
                            return (
                                <Box
                                    border={true}
                                    pad="small"
                                    align="center"
                                    justify="center"
                                    background={{color: "light-2", opacity: "strong"}}
                                    round={"xsmall"}
                                    gap="small">

                                    <Text>{el.name}</Text>
                                    <Button label="Take Demo Test" onClick={() => {

                                        let windowReference = window.open("", "_blank", "height=8000, width=8000,status=yes,toolbar=no,menubar=no,location=no");
                                        windowReference.location = `http://beatest.in/test/${el.id}/instructions`;

                                    }}/>
                                </Box>
                            )
                        }
                    )
                    }


                </Grid>
            </Box>

        )
    }

}

export {TrialPageUI};