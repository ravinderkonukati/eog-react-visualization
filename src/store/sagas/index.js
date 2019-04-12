import WeatherSagas from "./Weather";
import ApiErrors from "./ApiErrors";
import MetricsSagas from "./MetricsChart";

export default [...ApiErrors, ...WeatherSagas, ...MetricsSagas];
