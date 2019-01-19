import React from 'react';
import ReactFilterBox, {SimpleResultProcessing} from "react-filter-box";
import "react-filter-box/lib/react-filter-box.css";


class FilterBox extends React.Component {

    constructor(props){
        super(props);

        this.options = this.props.options;
    }

    onParseOk(expressions){
        if (expressions != null && expressions.length > 0) {
            this.props.onCondition(expressions);
        }
    }

    render(){
        return <ReactFilterBox
            options={this.options}
            onParseOk={this.onParseOk.bind(this)}
        />
    }
}

export {FilterBox};