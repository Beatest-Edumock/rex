import React, {Component} from 'react';


import {CSVLink} from "react-csv";


class ExportCSVButtonContainer extends Component {


    render() {
        // console.log(this.props.data);

        const data = this.props.data.map(el => {

            const sectionArr = {};

            for (let i = 0; i < el.section_attempts.length; i++) {
                sectionArr[`Section ${i + 1}`] = el.section_attempts[i].score;
            }
            return {
                'name': el.user.full_name,
                'college': el.user.college ? el.user.college.college_name : el.user.college,
                ...sectionArr,
                'status': el.user.application.type,
                "Total Score": el.score,
            }

        });


        return (

            <CSVLink data={data} filename={"results.csv"}>Download as CSV</CSVLink>
        );


    }

}


export {ExportCSVButtonContainer};