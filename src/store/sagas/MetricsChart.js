import { takeEvery, call, put, cancel } from "redux-saga/effects";
import API from "../api";
import * as actions from "../actions";

function* watchFetchMetrics() {
    const { error, data } = yield call(
        API.fetchMetrics,
    );
    if (error) {
        console.log({ error });

        yield put({ type: actions.API_ERROR, errorMsg: error });
        yield cancel();
        return;
    }
    yield put({ type: actions.METRICS_DATA_RECEIVED, metricsData: data });
}

function* watchMetricsSaga() {
    yield takeEvery(actions.FETCH_METRICS, watchFetchMetrics);
}

export default [watchMetricsSaga];
