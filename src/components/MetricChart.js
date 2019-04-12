import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import * as actions from "../store/actions";
import {connect} from "react-redux";
import {toast} from "react-toastify";


class MetricsChart extends PureComponent {
    constructor(props){
        super(props);
        this.getToastNotification = this.getToastNotification.bind(this)
    }


    componentDidMount() {
        const { fetchMetrics } = this.props;
        fetchMetrics();
    }

    componentDidUpdate() {
        const { fetchMetrics } = this.props;
        // fetching drone data for every 4 secs
        setTimeout(() => {
            fetchMetrics();
        }, 4000);
    }

    getToastNotification(){
        const { errorNotification } = this.props;
        if(errorNotification !== ''){
            toast(errorNotification); // using React-Tostify to show notification if there is any error in drone API fecth
        }
    }

    render() {

        const { metricsData } = this.props;
        return (
            <LineChart
                width={800}
                height={500}
                data={metricsData}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp"/>
                <YAxis />
                <Tooltip />
                <Legend />
                {this.getToastNotification()}
                <Line type="monotone" dataKey="metric" stroke="#8884d8"/>
            </LineChart>
        );
    }
}

const mapState = (state) => {
    const {
        loading,
        metricsData,
        errorNotification,
    } = state.metrics;
    return {
        loading,
        metricsData,
        errorNotification
    };
};

const mapDispatch = dispatch => ({
    fetchMetrics: () =>
        dispatch({
            type: actions.FETCH_METRICS,
        })
});

export default connect(
    mapState,
    mapDispatch
)(MetricsChart);
