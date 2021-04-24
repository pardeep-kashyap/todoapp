import axios from 'axios';

const timeSinceText = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + ' years';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + ' months';
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + ' days';
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + ' hours';
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + ' minutes';
    }
    return Math.floor(seconds) + ' seconds';
};

export { timeSinceText };

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
    };
};
const dataValues = [
    {
        title: 'Calories',
        type: 'com.google.calories.expended',
    },
    {
        title: 'Heart',
        type: 'com.google.heart_minutes',
    },
    {
        title: 'Move',
        type: 'com.google.active_minutes',
    },
    {
        title: 'Steps',
        type: 'com.google.step_count.delta',
    },
];

export const getAggregatedDataBody = (dataType, endTime) => {
    const requestBody = {
        aggregateBy: [
            {
                dataTypeName: dataType,
            },
        ],
        bucketByTime: {
            durationMillis: 86400000,
        },
        endTimeMillis: endTime,
        startTimeMillis: endTime - 7 * 86400000,
    };
    return requestBody;
};

export const getAggregateData = async (body, headers) => {
    const req = await axios.post(
        'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
        body,
        headers
    );
    return req;
};

// we need to return [{Today}, {Yesterday} .... {7 days back}]
// Each object has : {"Calories" : value, "Heart": value ... , "Date": }
const baseObj = {
    Calories: 0,
    Heart: 0,
    Move: 0,
    Steps: 0,
};

export const getWeeklyData = async (
    endTime,
    requestParameters,
    callBack,
    initialState
) => {
    let state = [];
    let promises = [];
    for (var i = 6; i >= 0; i--) {
        var currTime = new Date(endTime - i * 86400000);
        state.push({
            ...baseObj,
            Date: currTime,
        });
    }
    dataValues.forEach((element) => {
        let body = getAggregatedDataBody(element.type, endTime);
        promises.push(
            axios
                .post(
                    'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
                    body,
                    requestParameters
                )
                .then((resp) => {
                    // now, each data bucket represents exactly one day
                    for (let idx = 0; idx < 7; idx++) {
                        resp.data.bucket[idx].dataset[0].point.forEach(
                            (point) => {
                                point.value.forEach((val) => {
                                    let extract =
                                        val['intVal'] ||
                                        Math.ceil(val['fpVal']) ||
                                        0;
                                    if (!state[idx]) {
                                        let a = {};
                                        a[element.title] = 0;
                                        state.push({
                                            a,
                                        });
                                    }
                                    state[idx][element.title] = state[idx][
                                        element.title
                                    ]
                                        ? state[idx][element.title]
                                        : 0 + extract;
                                });
                            }
                        );
                    }
                })
        );
    });
    Promise.all(promises).then(() => {
        callBack(state);
    });
    // setReloadCookie();
};

// Provide request headers to be attached with each function call
export const getRequestHeaders = (accessToken) => {
    const requestHeaderBody = {
        params: {
            key: 'AIzaSyDI7tK_WYziIHcoC3kMYlGcAn0qZAVIKq8',
        },
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
        },
    };
    return requestHeaderBody;
};
