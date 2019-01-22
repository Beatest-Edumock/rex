import React from 'react';
import ReactFilterBox, {AutoCompleteOption, SimpleResultProcessing, Expression, GridDataAutoCompleteHandler} from "react-filter-box";
import "react-filter-box/lib/react-filter-box.css";


class FilterBox extends React.Component {

    constructor(props){
        super(props);

        this.options = this.props.options;
    }

    onParseOk(expressions){
        if (expressions != null && expressions.length >= 0) {
            this.props.onCondition(expressions);
        }
    }

    render(){
        return <ReactFilterBox
            autoCompleteHandler={this.props.autoCompleteHandler}
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
            case "==": return row[field] === value;
            case "!=": return row[field] !== value;
            case "contains": return row[field].toLowerCase().indexOf(value.toLowerCase()) >=0;
            case "!contains": return row[field].toLowerCase().indexOf(value.toLowerCase()) <0;
        }

        return false;
    }
}

class ScoreAutoComplete extends GridDataAutoCompleteHandler {

    // override this method to add new your operator
    needOperators(parsedCategory) {
        let result = [">=", "<=", ">", "<", "==", "!="];
        return result;
    }
}

class ScoreResultProcessing extends SimpleResultProcessing {

    // override this method to add your handler for startsWith operator
    filter(row, fieldOrLabel, operator, value){
        let field = this.tryToGetFieldCategory(fieldOrLabel);
        let score = parseFloat(value);
        switch(operator){
            case ">=": return row[field] >= score;
            case "<=": return row[field] <= score;
            case "<": return row[field] < score;
            case ">": return row[field] > score;
            case "==": return row[field] === score;
            case "!=": return row[field] !== score;
        }

        return false;
    }
}

export {FilterBox, FilterResultProcessing, ScoreAutoComplete, ScoreResultProcessing};