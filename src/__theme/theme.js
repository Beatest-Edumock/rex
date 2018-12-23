import {css} from 'styled-components';

const theme = {
    global: {
        colors: {
            brand: '#2d9ee0',
            // background: '#ffffff'
        },
        font: {
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",  "Helvetica Neue", Arial, sans-serif,  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
        }
    },
    anchor: {
        color: {
            dark: 'dark-5',
            light: 'dark-6'
        }
    },
    layer: {
        background:"none",
        overlay: {
            background: "rgba(0, 0, 0, 0.5)"
        }
    },
    button: {
        extend: css(["", ";"], function (props) {
            return !props.plain && 'font-weight: lighter;';
        }),
        border: {
            radius: "5px"
        }
    }
};

export {theme}




