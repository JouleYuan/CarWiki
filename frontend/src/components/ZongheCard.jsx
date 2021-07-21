import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LinkIcon from '@material-ui/icons/Link'
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
const style = theme => ({
  card: {
    margin: '10px',
   
  },
  title: {
    color: 'primary'
  },
  tag: {
    margin: '10px 5px 0 0',
    // color: '#ffffff'
  },
  summary: {
    overflow: 'hidden',
    maxHeight: '90px',
    margin: '10px 0',
    lineHeight: '30px',
    color: '#3d3d3d'
  },
});


class ZongheCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedA: 0,
    }
  }

  handleChange = (event) => {
    if (this.state.checkedA == 1) this.setState({ checkedA: 0 });
    if (this.state.checkedA == 0) this.setState({ checkedA: 1 });
  };

  render() {
    const { classes, data } = this.props;
    const handleSearch = (e) => {
      /* console.log(data); */
        this.props.history.push({
          pathname: `/search/carinfo/detail`,
          carinfo: {
            data: {data},
          }
        });
      }
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>

          <Link  onClick={handleSearch}  color="inherit">
            <Box fontSize={12} fontWeight={100} fontFamily="roboto" m={1}>
              {data.name}
            </Box>
          </Link>

            <div style={{ textAlign: "center" }}>
              <img src={data.picture} width="100"></img>
            </div>

            <Link href={data.dong_url} color="textSecondary" variant="caption" target="_blank">
              <LinkIcon style={{ fontSize: '16px', paddingRight: '5px' }} />
              {data.name}<br/> 厂商指导价：<br/>{data.min_price}~{data.max_price}
            </Link>

            <br/>

            

          </CardContent>
        </Card>
      </div>
    )
  }
}
const ItemRouter = withRouter(ZongheCard);
export default withStyles(style)( ItemRouter);