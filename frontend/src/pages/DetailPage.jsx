
import Typography from '@material-ui/core/Typography';
import NavBar from '../components/NavBar';
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import LinkIcon from '@material-ui/icons/Link'
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchResult from '../components/SearchResult';
const style = theme => ({
  main: {
    backgroundColor: '#F9F7F7',
    minHeight: 1000
  },
  wrapper: {
    padding: '100px 60px 15px 60px',
    [theme.breakpoints.down("xs")]: {
      padding: "10px 10px"
    }
  },
  navBar: {
    backgroundColor: 'transparent',
    boxShadow: '0 0 0 0',
    padding: '20px'
  },
  content: {
    padding: '0 20px',
    minHeight: 560
  },
  filter: {
    paddingTop: '50px'
  },
  sider: {

  },
  // filter: {
  //   height: '50px',
  //   width: '50%'
  // },
  pagination: {
    margin: '20px auto'
  },
  footer: {
    textAlign: 'center',
    color: '7D7D7D',
    marginTop: '1580px',
  },
  loveIcon: {
    fontSize: '1rem',
    padding: '2px 5px'
  }
});

class DetailPage extends Component {
  state = {
    input: this.props.match.params.input,
    loading: true,
    catalog: -1,
    time: 0,
    news_author: 0,
    news_sourcefrom: 0,
    news_typecat: "all",
    news_sort: "primary"
  }

  componentDidMount() {
    // console.log(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.input &&
      (this.props.match.params.input !== nextProps.match.params.input)) {
      this.setState({
        input: nextProps.match.params.input
      })
    }
  }

  changeCatalog = (catalog) => {
    this.setState({ catalog });
    // console.log("catalog", catalog);
  }

  render() {
    const { classes } = this.props;
    const { data } = this.props.location.carinfo.data;
    console.log(data);
    return (
      <div className={classes.main}>
        <NavBar className={classes.NavBar} />
        <br />
        <br />



        <div className={classes.wrapper}>

          <div style={{ border: "1px #000", paddingLeft: "120px" }}>
            <Box fontSize={32} fontWeight={1000} fontFamily="roboto" m={1} >
              {data.brand}-{data.name}
            </Box>
          </div>

          <div style={{ border: "1px #000", float: "left", width: "900px", height: "800px" }}>
            <img src={data.picture} width="900"></img>
            <SearchResult query={{"input": data.name,"catalog":3}} />
          </div>

          <div style={{ border: "1px #000", float: "right", width: "650px", height: "800px" }}>



            <span style={{ color: "#666d7f", fontSize: "14px" }}>
              厂商指导价
            </span>
            <span style={{ position: "relative", top: "2px", color: "#f60", fontSize: "26px", fontWeight: "700", paddingLeft: "4px", lineHeight: "1" }}>
              {data.min_price}~{data.max_price}
            </span>
            <span style={{ position: "relative", top: "2px", color: "#f60", fontSize: "20px", fontWeight: "500", paddingLeft: "4px", lineHeight: "1" }}>
              万元
            </span>
            <br />
            <br />

            <span style={{ color: "#666d7f", fontSize: "14px" }}>{data.size} / 懂车帝评分：{data.dong_score} / 汽车之家评分：{data.jia_score}</span>

            <br />
            <br />


            <span style={{ color: "#666d7f", fontSize: "14px" }}>
              详细参数：
            </span>
            <br />
            <br />
            <TableContainer component={Paper} style={{ width: "400px" }}>
              <Table style={{ width: "400px" }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row"><span style={{ fontWeight: "900" }}>汽车品牌</span></TableCell>
                    <TableCell align="left">{data.brand}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row"><span style={{ fontWeight: "900" }}>汽车名称</span></TableCell>
                    <TableCell align="left">{data.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row"><span style={{ fontWeight: "900" }}>车辆类型</span></TableCell>
                    <TableCell align="left">{data.type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row"><span style={{ fontWeight: "900" }}>车辆尺寸</span></TableCell>
                    <TableCell align="left">{data.size}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row"><span style={{ fontWeight: "900" }}>发动机参数</span></TableCell>
                    <TableCell align="left">{data.engine}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row"><span style={{ fontWeight: "900" }}>变速箱参数</span></TableCell>
                    <TableCell align="left">{data.gearbox}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <span style={{ fontWeight: "900" }}>懂车帝链接</span>
                    </TableCell>
                    <TableCell align="left">
                      <Link href={data.dong_url} color="inherit" target="_blank">
                        <span style={{ color: "#05f" }}><LinkIcon style={{ fontSize: '16px', paddingRight: '5px' }} />点此跳转</span>
                      </Link></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <span style={{ fontWeight: "900" }}>汽车之家链接</span>
                    </TableCell>
                    <TableCell align="left">
                      <Link href={data.jia_url} color="inherit" target="_blank">
                        <span style={{ color: "#05f" }}><LinkIcon style={{ fontSize: '16px', paddingRight: '5px' }} />点此跳转</span>
                      </Link></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            
          </div>

        </div>
        <footer className={classes.footer}>
          <Typography variant="body2" component="p">
            &copy;2021 Created By G09
          </Typography>
        </footer>

      </div>

    )
  }
}

export default withStyles(style)(DetailPage);