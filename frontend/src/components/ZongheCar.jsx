import React, { Component } from 'react'
import ItemCard from './ItemCard';
import withStyles from "@material-ui/core/styles/withStyles";
import ZongheCard from './ZongheCard';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    /* justifyContent: 'center' */
  }
}

class ZongheCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { classes, data } = this.props;
    
	/* var ppt = JSON.parse(data); */
    var top5= data.slice(0,5);
    var top1= data.slice(5);
    return (
        <div>
      <div className={classes.container}>
        {
          top5.map((item, index) => (
            <ZongheCard key={index} data={item} />
          ))
        }
        
      </div >
      <div className={classes.container}>
        {
          top1.map((item, index) => (
            <ZongheCard key={index} data={item} />
          ))
        }
        
      </div >
      </div>
    )
  }
}

export default withStyles(style)(ZongheCar);