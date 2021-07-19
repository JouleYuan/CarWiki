import React, { Component } from 'react'
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { DateRange } from '@material-ui/icons';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClassIcon from '@material-ui/icons/Class';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
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
const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
});

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}
class Newstypecat extends Component {
  state = {
    selectedTime: '时间不限',
    // selectedSources: []
  }

  handleTimeChange = (e) => {
    this.props.changenews_typecat(e.target.value);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.sider}>
      <FormControl component="fieldset">
      <FormLabel component="legend">筛选资讯类型</FormLabel>
      <RadioGroup defaultValue="all" aria-label="gender" name="customized-radios" onChange={this.handleTimeChange}>
        <FormControlLabel value="all" control={<StyledRadio />} label="全部" />
        <FormControlLabel value="视频" control={<StyledRadio />} label="视频" />
        <FormControlLabel value="文字" control={<StyledRadio />} label="文字" />
      </RadioGroup>
    </FormControl>
      </div>
    )
  }
}

export default withStyles(style)(Newstypecat);