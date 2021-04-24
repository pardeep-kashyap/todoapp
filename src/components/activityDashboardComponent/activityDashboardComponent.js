import React from 'react';
import { getWeeklyData, getRequestHeaders } from './../../utils/util';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './activityDashboardComponent.scss';
import googlephone from './../../assets/images/googlephone.png';


export default function ActivityDashboardComponent() {
    let Day = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const [weekData, setWeekData] = useState([]);

    useEffect(() => {
        fitnessGoogleAPI();
    }, []);

    const callBack = (state) => {
        setWeekData(state);
        console.log('weekData', state);
    };

    const fitnessGoogleAPI = () => {
        const accessToken = localStorage.getItem('accessToken');
        const requestHeaders = getRequestHeaders(accessToken);
        const timeRightNow = new Date().getTime();
        getWeeklyData(timeRightNow, requestHeaders, callBack, weekData);
    };

    return (
        <div className={classes.activityDashboardComponent}>
            <Container className="p-3">
                <div>
                    <h1>Coaching you to a healthier and more active life</h1>
                    <Row className={classes.Row}>
                        <Col>
                            {weekData.map((week, index) => {
                                return (
                                    <li key={index} className={classes.list}>
                                        <div>
                                            <b>{Day[week.Date.getDay()]}</b>{' '}
                                        </div>
                                        <div>
                                            <span>
                                                Calories - {week.Calories}
                                            </span>
                                            <span>Hearts - {week.Heart}</span>
                                            <span>Moves - {week.Move}</span>
                                            <span>Steps - {week.Steps}</span>
                                        </div>
                                    </li>
                                );
                            })}
                        </Col>
                        <Col>
                            <img src={googlephone} />
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}
