import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

class Journeys extends Component {

    render() {
        const { journeysIsLoading, journeys, fromStation, toStation } = this.props.data;
        //const disruptions = journeys.journeys.disruptions;
        //const notes = journeys.journeys.notes;


        /*journeys.map(function (place) {
            stations.push({
                value: place.id,
                label: place.name
            });
        });

        const rows_of_journeys = journeys.journeys.map(function (journey) {
            return (
                <Journey
                    key={ eventid }
                    journey={ journey }
                />
            );
        })*/

        const loadingJourneys = (
            <div className="text-center">
                <p>
                    <i className="fa fa-3x fa-spinner fa-spin"></i>
                </p>
                <p>Please wait while we're retrieving your trains</p>
            </div>
        );

        const noJourneys = (
            <div className="no-events text-center">
                <div className="well well-sm">
                    <p>
                        <i className="fa fa-3x fa-calendar-times-o text-muted"></i>
                    </p>
                    <p>There are no trains available from <strong>{ fromStation.label }</strong> to <strong>{ toStation.label }</strong></p>
                </div>
            </div>
        );

        if (journeysIsLoading) {
            return (
                <div className="journeys">
                    { loadingJourneys }
                </div>
            );
        }
        if (!journeysIsLoading && _.isEmpty(journeys)) {
            return (
                <div className="text-center">
                    <p>Please choose the FROM and TO station for your next journey</p>
                </div>
            );
        }
        if (!journeysIsLoading && _.size(journeys) === 0) {
            return (
                <div className="journeys">
                    { noJourneys }
                </div>
            );
        }
        return (
            <div className="journeys">
                <div className="panel panel-sm">
                    <div className="panel-heading">Journeys</div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state
    };
}

export default connect(mapStateToProps)(Journeys);