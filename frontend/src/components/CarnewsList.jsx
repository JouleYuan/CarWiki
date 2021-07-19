import React, { Component } from 'react'
import CarnewsCard from './CarnewsCard';
import withStyles from "@material-ui/core/styles/withStyles";

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}

class CarnewsList extends Component {
  render() {
    const { classes, data } = this.props;
    return (
      <div className={classes.container}>
        { data.map((item, index) => (
          <CarnewsCard key={index} data={item} />
        ))}
      </div>
    )
  }
}

export default withStyles(style)(CarnewsList);