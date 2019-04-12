import * as actions from "../actions";

const initialState = {
    loading: false,
    metricsData: {},
    errorNotification: ''
};

const startLoading = (state, action) => {
    return { ...state, loading: true };
};

const metricsDataReceived = (state, action) => {
    const { metricsData } = action;
    const formatedData = metricsData.data.map(metric => {
        let date = new Date(metric.timestamp);
        return {
            ...metric,
            timestamp: date.getHours() + ":" + date.getMinutes()
        }
    })
    return {
        ...state,
        metricsData: formatedData
    };
};

const errorNotification = (state, action) => {
    const { errorMsg } = action;
    return {
        ...state,
        errorNotification:  errorMsg.error
    };
};

const handlers = {
    [actions.FETCH_METRICS]: startLoading,
    [actions.METRICS_DATA_RECEIVED]: metricsDataReceived,
    [actions.API_ERROR]: errorNotification
};

export default (state = initialState, action) => {
    const handler = handlers[action.type];
    if (typeof handler === "undefined") return state;
    return handler(state, action);
};
