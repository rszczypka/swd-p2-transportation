import React, {Component} from 'react';
import {connect} from 'react-redux';
import Journey from './Journeys.react';
import moment from 'moment';
import 'moment-duration-format';
import {Panel, PanelGroup} from 'react-bootstrap';
import _ from 'lodash';

class Journeys extends Component {

    render() {
        let display_journey;
        let journey_info;
        const {journeysIsLoading, journeys, fromStation, toStation} = this.props.data;

        if(journeys.journeys){
            journey_info = journeys.journeys.map(function(journey_item, index){
                let one_journey;
                let sections = journey_item.sections.map(function (section, index) {
                    let output = '';
                    if (section.type === 'public_transport') {
                        output = (
                            <div className="row" key={'section'+index}>
                                <div className="col-sm-5">
                                    <strong>
                                        <small>{ section.from.name }</small>
                                    </strong><br />
                                    <small>Departure: </small>
                                    <strong className="accent-color">
                                        { moment(section.departure_date_time).format('HH:mm') }
                                    </strong>
                                </div>
                                <div className="col-sm-2">
                                    <span className="fa fa-circle trainLineFrom"></span>
                                    <span className="trainLine"></span>
                                    <span className="fa fa-chevron-circle-right trainLineTo"></span>
                                </div>
                                <div className="col-sm-5 text-right">
                                    <strong>
                                        <small>{ section.to.name }</small>
                                    </strong><br />
                                    <small>Arrival: </small>
                                    <strong className="accent-color">
                                        { moment(section.arrival_date_time).format('HH:mm') }
                                    </strong>
                                </div>
                            </div>
                        );
                    }

                    if (section.type === 'waiting') {
                        output = (
                            <div className="row" key={'section'+index}>
                                <div className="col-sm-12">
                                    <small>Waiting for: </small>
                                    <strong className="accent-color">
                                        { moment.duration(section.duration, 'seconds').format('H[h]mm[min]') }
                                    </strong>
                                </div>
                            </div>
                        );
                    }

                    if (section.type === 'transfer') {
                        output = (
                            <div className="row" key={'section'+index}>
                                <div className="col-sm-12">
                                    <small>{ section.transfer_type } for: </small>
                                    <strong className="accent-color">
                                        { moment.duration(section.duration, 'seconds').format('H[h]mm[min]') }
                                    </strong>
                                    <br />from <strong>
                                    <small>{ section.from.name }</small>
                                </strong> to <strong>
                                    <small>{ section.to.name }</small>
                                </strong>
                                </div>
                            </div>
                        );
                    }


                    return output;

                });

                let journey_title = (
                    <div className="panel-heading">
                        <ul className="list-inline">
                            <li>
                                <small>Journey Duration: </small>
                                <strong>{ moment.duration(journey_item.duration, 'seconds').format('H[h]mm[min]') }</strong>
                            </li>
                            <li><span className="label label-default">{ journey_item.type.replace(/[_]/g,' ') }</span></li>
                            <li>{ journey_item.status ? 'Information: ' + journey_item.status : '' }</li>
                            <li>{ journey_item.display_informations ? journey_item.display_informations.commercial_mode : '' }</li>
                            <li className="pull-right">
                                <strong>{ journey_item.nb_transfers === 0 ? 'Direct journey' : 'Connections: ' + journey_item.nb_transfers }</strong>
                            </li>
                        </ul>
                        <div className="row">
                            <div className="col-sm-5">
                                <small>Journey Departure: </small>
                                <strong
                                    className="accent-color">{ moment(journey_item.departure_date_time).format('HH:mm') }</strong>
                            </div>
                            <div className="col-sm-2">
                                <span className="fa fa-circle accent-color trainLineFrom"></span>
                                <span className="trainLine"></span>
                                <span className="fa fa-chevron-circle-right accent-color trainLineTo"></span>
                            </div>
                            <div className="col-sm-5 text-right">
                                <small>Journey Arrival: </small>
                                <strong
                                    className="accent-color">{ moment(journey_item.arrival_date_time).format('HH:mm') }</strong>
                            </div>
                        </div>
                    </div>
                );

                return (
                    <Panel key={'journey'+index} eventKey={ index } header={ journey_title }>
                        <div className="panel-body">
                            { sections }
                        </div>
                    </Panel>
                )
            });
        }



        if (journey_info) {
            display_journey = (
                <div>
                    <PanelGroup accordion>
                        { journey_info }
                    </PanelGroup>
                </div>
            );
        }


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
                    <p>There are no trains available from <strong>{ fromStation.label }</strong> to
                        <strong>{ toStation.label }</strong></p>
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
        if (display_journey) {
            return (
                <div className="journeys">
                    { display_journey }
                </div>
            );
        }
        return false;

    }
}

function mapStateToProps(state) {
    return {
        data: state
    };
}

export default connect(mapStateToProps)(Journeys);