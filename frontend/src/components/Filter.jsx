import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { DateRange } from '@material-ui/icons';
import Select from '@material-ui/core/Select';
// import Checkbox from '@material-ui/core/Checkbox';
// import Typography from '@material-ui/core/Typography';
var date = new Date().getTime();
let selectedTime1='时间不限';
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
function formatDate (value) {
  if (typeof (value) == 'undefined') {
      return ''
  } else {
      let date = new Date(parseInt(value))
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
  }
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const options = {
  time: ['时间不限', '过去24小时内', '过去一周内', '过去一月内','过去一年内'],
  sources: ['CSDN', '简书', 'Coursera']
}

class Filter extends Component {
  state = {
    selectedTime: '时间不限',
    // selectedSources: []
  }

  handleTimeChange = (e) => {
/*     var year=date.getFullYear(); 
var mon=date.getMonth()+1;
var day=date.getDate();
var h=date.getHours(); 
var m=date.getMinutes();
var s=date.getSeconds();  */
var date = new Date().getTime();
var submitTime = "";
if(options.time.indexOf(e.target.value)===0){
date=0
}
if(options.time.indexOf(e.target.value)===1){
date=date-86400000
}
if(options.time.indexOf(e.target.value)===2){
date=date-7*86400000
}
if(options.time.indexOf(e.target.value)===3){
date=date-2592000000
}
if(options.time.indexOf(e.target.value)===4){
  date=date-31104000000
  }
/* submitTime += year + "-";
if(mon >= 10) {
          submitTime += mon + "-";
        }else {
          submitTime += "0" + mon + "-";
        }
        if(day >= 10) {
          submitTime += day;
        }else {
          submitTime += "0" + day;
        }
        submitTime +=" ";
        if(h >= 10) {
          submitTime += h + ":";
        }else {
          submitTime += "0" + h + ":";
        }
        if(m >= 10) {
          submitTime += m + ":";
        }else {
          submitTime += "0" + m + ":";
        }
        if(s >= 10) {
          submitTime += s;
        }else {
          submitTime += "0" + s;
        } */
        submitTime=formatDate(date);
console.log(submitTime);
    const index = options.time.indexOf(e.target.value)
    this.setState({
      selectedTime: e.target.value
    })
    const finaltime=submitTime
    selectedTime1 = e.target.value;
    this.props.changeTime(finaltime);
  }

  handleSourceChange = value => () => {
    let items = this.state.selectedSources;
    let item = value;
    let newItems = [...items];
    let currentIndex = items.indexOf(item);
    if(currentIndex === -1) {
      newItems.push(item);
    } else {
      newItems.splice(currentIndex, 1);
    }
    console.log(newItems);

    this.setState({
      selectedSources: newItems
    })
  }

  render() {
    const { classes } = this.props;
    const { selectedTime } = this.state;
    /* const { selectedTime1 } = selectedTime; */
    return (
      <div className={classes.sider}>
        {/* <Typography variant="subtitle1" component="h2" className={classes.title}>
          条件筛选
        </Typography> */}
        <FormControl className={classes.formControl}>
          <FormLabel component="legend" className={classes.label}> 
            <DateRange /> 发布时间
          </FormLabel>
          <Select
            value={selectedTime1}
            onChange={this.handleTimeChange}
            input={<Input id="select-multiple" />}
            MenuProps={MenuProps}
          >
            {options.time.map(time => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )
  }
}

export default withStyles(style)(Filter);