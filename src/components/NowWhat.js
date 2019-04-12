import React from "react";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import MetricChart from "./MetricChart";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white"
  }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const styles = {
  card: {
    margin: "5% 25%"
  }
};

const NowWhat = props => {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardHeader title="Drone Temparature" />
      <CardContent>
        <ToastContainer />
        <MetricChart/>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(NowWhat);
