import React, { Component } from 'react';
import {Box} from 'grommet';

export const AppBar = (props) => (
    <Box
        tag='header'
        direction='row'
        align='center'
        justify='left'
        background='brand'
        pad={{left: 'medium', right: 'small', vertical: 'small'}}
        elevation='medium'
        style={{zIndex: '0'}}
        {...props}
    />
);
