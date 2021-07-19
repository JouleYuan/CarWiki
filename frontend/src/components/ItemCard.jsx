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
    padding: '10px'
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


class ItemCard extends Component {
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
            <Box fontSize={32} fontWeight={1000} fontFamily="roboto" m={1}>
              {data.name}
            </Box>
          </Link>

            <div style={{ textAlign: "center" }}>
              <img src={data.picture} width="800"></img>
            </div>

            <Link href={data.dong_url} color="textSecondary" variant="caption" target="_blank">
              <LinkIcon style={{ fontSize: '16px', paddingRight: '5px' }} />
              {data.name} 厂商指导价：{data.min_price}~{data.max_price}
            </Link>

            <br/>

            <FormControlLabel
              control={<Switch
                checked={this.state.checkedA}
                onChange={this.handleChange}
                color="primary"
                name="checkedA"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />}
              label=""
            />

            {this.state.checkedA == 1 ? (<div>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">汽车品牌</TableCell>
                      <TableCell align="left">{data.brand}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">懂车帝评分</TableCell>
                      <TableCell align="left">{data.dong_score}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">汽车之家评分</TableCell>
                      <TableCell align="left">{data.jia_score}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">官方价格</TableCell>
                      <TableCell align="left">{data.min_price}~{data.max_price}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">车辆类型</TableCell>
                      <TableCell align="left">{data.type}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">车辆尺寸</TableCell>
                      <TableCell align="left">{data.size}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">发动机参数</TableCell>
                      <TableCell align="left">{data.engine}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">变速箱参数</TableCell>
                      <TableCell align="left">{data.gearbox}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        懂车帝链接
                      </TableCell>
                      <TableCell align="left">
                        <Link href={data.dong_url} color="inherit" target="_blank">
                          点此跳转
                        </Link></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        汽车之家链接
                      </TableCell>
                      <TableCell align="left">
                        <Link href={data.jia_url} color="inherit" target="_blank">
                          点此跳转
                        </Link></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>) : null}

          </CardContent>
        </Card>
      </div>
    )
  }
}
const ItemRouter = withRouter(ItemCard);
export default withStyles(style)( ItemRouter);