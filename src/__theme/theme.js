import {css} from 'styled-components';

const theme = {
    global: {
        colors: {
            brand:'#2d9ee0',
            // background: '#ffffff'
        },
        font: {
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",  "Helvetica Neue", Arial, sans-serif,  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
        }
    },
    anchor: {
        color: {
            dark: '#FD6FFF',
            light: '#9060EB'
        }
    },
    button: {
        extend: css(["", ";"], function (props) {
            return !props.plain && 'font-weight: bold;';
        }),
        border:{
            radius: "0px"
        }
    }
};

export {theme}




