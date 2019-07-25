import React from 'react';
import {ShortListUI} from "./ShortListUI";
import {pushPersonalityAnalysisAC, pushQualitativeAnalysisAC, pushTestAttempts} from "../../_Redux/ActionCreators/TestAttempts-ActionCreator";
import {connect} from 'react-redux'
import {Box, Button, Text} from "grommet";
import {FilterBox, FilterResultProcessing, ScoreAutoComplete, ScoreResultProcessing} from "../../Common/FilterBox/FilterBox";
import {getTestAttemptsPersonalityAnalysisAPI, getTestAttemptsQualitativeAnalysisAPI} from "../../_Api/Tests/TestAttempts/TestAttempts";


function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

const columnDefinitions = {
    name: {columField: "name", columnText: "Name", type: "text"},
    score: {columField: "score", columnText: "Score", type: "text"},
};

class ShortList extends React.Component {


    constructor() {


        super();
        this.loadQualitativeAnalysis = this.loadQualitativeAnalysis.bind(this);
        this.loadPersonalityAnalysis = this.loadPersonalityAnalysis.bind(this);

    }

    loadQualitativeAnalysis() {

        getTestAttemptsQualitativeAnalysisAPI(this.props.testOverview.id).then(({data}) => {
            this.props.addQualitativeAnalysisResults(data);

        })

    }

    loadPersonalityAnalysis() {

        getTestAttemptsPersonalityAnalysisAPI(this.props.testOverview.id).then(({data}) => {
            if (data.test_attempts[0].sixteen_p_report)
                this.props.addPersonalityAnalysisResults(data);

        })

    }


    render() {

        const shortListUIInstance = this.shortListUI;

        const columns = [
            {
                id: 'name',
                Header: props => <Box>Name</Box>,
                accessor: d => d.user.full_name,
                filterMethod: (filter, row) => {
                    return new FilterResultProcessing([columnDefinitions.name]).predicate(row, filter.value);
                },
                Filter: ({filter, onChange}) =>
                    <FilterBox options={[columnDefinitions.name]} onCondition={onChange}/>,
                Footer: (props) => {
                    return <Text>Selected: {shortListUIInstance && shortListUIInstance.state.selection.length}</Text>
                },
                Cell: props =>
                    <Text size="small">     {props.value.replace(
                        /\w\S*/g,
                        function (txt) {
                            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                        }
                    )}
                    </Text>
            },
            {
                Header: props => <Text size={"xsmall"}>Section <br/> Cutoffs</Text>,
                columns: []
            },
            {
                id: 'score',
                Header: props => <Text size={"xsmall"}>Total <br/> Score</Text>,
                accessor: "score",
                filterMethod: (filter, row) => {
                    return new ScoreResultProcessing([columnDefinitions.score]).predicate(row, filter.value);
                },
                Filter: ({filter, onChange}) =>
                    <FilterBox autoCompleteHandler={new ScoreAutoComplete([], [columnDefinitions.score])} options={[columnDefinitions.score]} onCondition={onChange}/>,
                Cell: props =>
                    <Text textAlign="center" size="small" margin="large"> {props.value}</Text>
            }
        ];
        const columnsModified = columns.slice();

        if (this.props.testOverview.test_attempts.length > 0) {

            const sections = this.props.testOverview.sections;
            for (let i = 0; i < this.props.testOverview.test_attempts[0].section_attempts.length; i++) {

                //TODO: remove contains and !contains because it doesn't work for number values
                columnDefinitions[`$section_${i + 1}`] = {columField: `$section_${i + 1}`, columnText: `Section_${i + 1}`, type: "text"};
                let scoreAutoComplete = new ScoreAutoComplete([], [columnDefinitions[`$section_${i + 1}`]]);
                columnsModified[1].columns.push({

                    Header: props => <Text>{i + 1} <br/> {sections[i].name}</Text>,
                    id: `$section_${i + 1}`,
                    accessor: d => {
                        return d.section_attempts[i].score
                    },
                    // maxWidth: 45,
                    filterMethod: (filter, row) => {
                        return new ScoreResultProcessing([columnDefinitions[`$section_${i + 1}`]]).predicate(row, filter.value);
                    },
                    Filter: ({filter, onChange}) =>
                        <FilterBox autoCompleteHandler={scoreAutoComplete} options={[columnDefinitions[`$section_${i + 1}`]]} onCondition={onChange}/>,
                    Cell: props =>

                        <Text textalign="center" size="medium" color={props.value < 0 ? "status-critical" : "status-ok"}> {props.value}</Text>


                })


            }

        }

        columnsModified.push({

            Header: "Application Status",
            id: 'application_status',
            accessor: d => {
                return d.user.application.type;
            },
            resizable: true,

            Cell: props => {
                let color = null;
                switch (props.value) {
                    case "accepted":
                        color = "status-ok";
                        break;
                    case "rejected":
                        color = "status-critical";
                        break;
                    case "shortlisted":
                        color = "status-warning";
                }


                return (
                    <Box round="xsmall"
                         basis="full"
                         align="center"
                         justify="center"
                         background={color}
                         pad={{horizontal: "small", vertical: "xsmall"}}

                    >

                        <Text textalign="center" size="xsmall"> {props.value}</Text>

                    </Box>
                );
            }


        });


        columnsModified.push({

            Header: "College",
            id: 'college_name',
            accessor: d => {
                if (d.user.college !== null)
                    return d.user.college.college_name;
            },

            Cell: props => {
                let color = null;

                // const value = props.value.replace(/" *"/g, "<br/>");
                const value = props.value;


                return (

                    <Text textalign="center" size="xsmall">{value}</Text>
                );
            }


        });


        // if (this.props.testOverview["id"]) {
        //     if (this.props.testOverview.test_attempts[0].length !== 0) {
        //         let report = this.props.testOverview.test_attempts[0].report;
        //         // console.log(report);
        //
        //
        //         if (report)
        //             Object.keys(report).map((el) => {
        //
        //                 if (el === "is_finished" || el === "create_date")
        //                     return;
        //
        //
        //                 columnsModified.push({
        //
        //                     Header: toTitleCase(el).replace(/_/g, " "),
        //                     id: el,
        //                     width: 150,
        //                     accessor: d => {
        //                         if (d.report) {
        //
        //                             return d.report[el];
        //                         }
        //
        //                     },
        //
        //                     Cell: props => {
        //                         let color = null;
        //
        //                         // const value = props.value.replace(/" *"/g, "<br/>");
        //                         const value = props.value;
        //
        //
        //                         return (
        //
        //                             <Text textalign="center" size="xsmall">{value}</Text>
        //                         );
        //                     }
        //
        //
        //                 });
        //
        //             });
        //
        //
        //         // for (let i = 0; i < Object.keys(report).length; i++) {
        //         //
        //         //
        //         //     columnsModified.push({
        //         //
        //         //         Header: toTitleCase(report[i]),
        //         //         id: 'logical_reasoning_ability',
        //         //         width: 1000,
        //         //         accessor: d => {
        //         //             if (d.report) {
        //         //
        //         //                 return d.report.logical_reasoning_ability;
        //         //             }
        //         //
        //         //         },
        //         //
        //         //         Cell: props => {
        //         //             let color = null;
        //         //
        //         //             // const value = props.value.replace(/" *"/g, "<br/>");
        //         //             const value = props.value;
        //         //
        //         //
        //         //             return (
        //         //
        //         //                 <Text textalign="center" size="xsmall">{value}</Text>
        //         //             );
        //         //         }
        //         //
        //         //
        //         //     });
        //         //
        //         //
        //         // }
        //
        //     }
        // }


        const QualitativeReportColumn = {
            Header: "Growth Potential",
            id: 'qualitative_analysis',
            columns: []

        };

        if (this.props.testOverview["id"]) {
            if (this.props.testOverview.test_attempts[0].length !== 0) {
                let report = this.props.testOverview.test_attempts[0].report;
                // console.log(report);


                if (report)
                    Object.keys(report).map((el) => {

                        if (el === "is_finished" || el === "create_date")
                            return;


                        QualitativeReportColumn.columns.push({

                            Header: toTitleCase(el).replace(/_/g, " "),
                            id: el,
                            width: 150,
                            accessor: d => {
                                if (d.report) {

                                    return d.report[el];
                                }

                            },

                            Cell: props => {
                                let color = null;

                                // const value = props.value.replace(/" *"/g, "<br/>");
                                const value = props.value;


                                return (

                                    <Text textalign="center" size="xsmall">{value}</Text>
                                );
                            }


                        });

                    });


                columnsModified.push(QualitativeReportColumn);


                // for (let i = 0; i < Object.keys(report).length; i++) {
                //
                //
                //     columnsModified.push({
                //
                //         Header: toTitleCase(report[i]),
                //         id: 'logical_reasoning_ability',
                //         width: 1000,
                //         accessor: d => {
                //             if (d.report) {
                //
                //                 return d.report.logical_reasoning_ability;
                //             }
                //
                //         },
                //
                //         Cell: props => {
                //             let color = null;
                //
                //             // const value = props.value.replace(/" *"/g, "<br/>");
                //             const value = props.value;
                //
                //
                //             return (
                //
                //                 <Text textalign="center" size="xsmall">{value}</Text>
                //             );
                //         }
                //
                //
                //     });
                //
                //
                // }

            }
        }


        const PersonalityAnalysis = {
            Header: "Personality Analysis",
            id: 'personality_analysis',
            columns: []

        };

        if (this.props.testOverview["id"]) {
            if (this.props.testOverview.test_attempts[0].length !== 0) {
                let report = this.props.testOverview.test_attempts[0].personality;
                // console.log(report);


                if (report)
                    Object.keys(report).map((el) => {

                        if (el === "is_finished" || el === "create_date")
                            return;

                        if (!el.includes("_value"))
                            return;

                        let text = "";
                        if (el.includes('mind'))
                            text = "Extrovert";

                        if (el.includes('energy'))
                            text = "Intuitive";

                        if (el.includes('nature'))
                            text = "Thinking";

                        if (el.includes('tactics'))
                            text = "Judging";

                        if (el.includes('identity'))
                            text = "Assertive";

                        PersonalityAnalysis.columns.push({

                            Header: text,
                            id: el,
                            width: 150,
                            accessor: d => {
                                if (d.personality) {

                                    return d.personality[el];
                                }

                            },

                            Cell: props => {
                                let color = null;

                                // const value = props.value.replace(/" *"/g, "<br/>");
                                const value = props.value;


                                return (

                                    <Text textalign="center" size="xsmall">{value}</Text>
                                );
                            }


                        });

                    });


                columnsModified.push(PersonalityAnalysis);


                // for (let i = 0; i < Object.keys(report).length; i++) {
                //
                //
                //     columnsModified.push({
                //
                //         Header: toTitleCase(report[i]),
                //         id: 'logical_reasoning_ability',
                //         width: 1000,
                //         accessor: d => {
                //             if (d.report) {
                //
                //                 return d.report.logical_reasoning_ability;
                //             }
                //
                //         },
                //
                //         Cell: props => {
                //             let color = null;
                //
                //             // const value = props.value.replace(/" *"/g, "<br/>");
                //             const value = props.value;
                //
                //
                //             return (
                //
                //                 <Text textalign="center" size="xsmall">{value}</Text>
                //             );
                //         }
                //
                //
                //     });
                //
                //
                // }

            }
        }


        return (
            <div>
                <ShortListUI ref={r => (this.shortListUI = r)}
                             data={this.props.testOverview.test_attempts}
                             testName={this.props.testOverview.name}
                             isLoading={this.props.testOverview.name === undefined}
                             onQualitativeAnalysesClick={this.loadQualitativeAnalysis}
                             onPersonalityLoadClick={this.loadPersonalityAnalysis}
                             column_format={columnsModified.slice()}

                />
            </div>
        );
    }

}

function mapStateToProps(state, ownProps) {


    return {
        ...ownProps,
        testOverview: state.testOverview

    }

}


function mapDispatchToProps(dispatch) {

    return {
        addTestAttemptsOverview: (data) => {
            dispatch(pushTestAttempts(data));
        },

        addQualitativeAnalysisResults: (data) => {
            dispatch(pushQualitativeAnalysisAC(data))
        },
        addPersonalityAnalysisResults: (data) => {
            dispatch(pushPersonalityAnalysisAC(data))
        }
    }

}


let ShortListContainer = connect(mapStateToProps, mapDispatchToProps)(ShortList);


export {ShortListContainer};