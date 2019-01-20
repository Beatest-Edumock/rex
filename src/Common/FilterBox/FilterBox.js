import React from 'react';
import ReactFilterBox, {SimpleResultProcessing} from "react-filter-box";
import "react-filter-box/lib/react-filter-box.css";


class FilterBox extends React.Component {

    constructor(props){
        super(props);

        this.options = this.props.options;
    }

    onParseOk(expressions){
        //TODO: how can expressions be reset?
        if (expressions != null && expressions.length > 0) {
            this.props.onCondition(expressions);
        }
    }

    render(){
        return <ReactFilterBox
            autoCompletHandler={this.props.autoComplete}
            options={this.options}
            onParseOk={this.onParseOk.bind(this)}
        />
    }
}

class FilterResultProcessing extends SimpleResultProcessing {

    // override this method to add your handler for startsWith operator
    filter(row, fieldOrLabel, operator, value){
        let field = this.tryToGetFieldCategory(fieldOrLabel);
        switch(operator){
            case "==": return row[field] == value;
            case "!=": return row[field] != value;
            case "contains": return row[field].toLowerCase().indexOf(value.toLowerCase()) >=0;
            case "!contains": return row[field].toLowerCase().indexOf(value.toLowerCase()) <0;
        }

        return false;
    }
}

export {FilterBox, FilterResultProcessing};