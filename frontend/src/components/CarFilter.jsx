import React, { Component } from 'react'
import withStyles from "@material-ui/core/styles/withStyles";
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import emitter from "./ev"

const style = {
  formControl: {
    minWidth: 200,
    width: '40%',
    margin: '15px 0',
    // flexDirection: 'row',
    // alignItems: 'center'
  },
  sider: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    margin: '10px 0'
  }
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

class CarFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "SUV"
    }
  }

  render() {
    const handleChange = (event) => {
      this.setState({ size: event.target.value });
      emitter.emit("callMe", event.target.value)
    }
    return (
      <div>
        <div>条件选车</div>
        <p>{this.state.size}</p>
        <FormControl>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={this.state.size}
            onChange={handleChange}
            autoWidth
          >
            <MenuItem value={"SUV"}>SUV</MenuItem>
            <MenuItem value={"中型车"}>中型车</MenuItem>
          </Select>
        </FormControl>
      </div>
    )
  }
}

export default withStyles(style)(CarFilter);