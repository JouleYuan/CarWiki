import React, { Component } from 'react'
import withStyles from "@material-ui/core/styles/withStyles";
import Chip from '@material-ui/core/Chip';
import { LabelOutlined } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Pagination from "material-ui-flat-pagination";
import CircularProgress from '@material-ui/core/CircularProgress';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  tag: {
    margin: '10px 5px',
  },
  title: {
    margin: 10
  },
  grid: {
    margin: '5px 0'
  },
  pagination: {
    margin: '20px auto'
  },
  progress: {
    display: 'flex',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

 const data = [
  {tag: "全部", count: 917},
   {tag: "奔驰", count: 40},
   {tag: "奥迪", count: 17},
   {tag: "大众", count: 37},
  {tag: "长安", count: 52},
   {tag: "江淮", count: 21},
   {tag: "宝马", count: 31},
  {tag: "北汽", count: 8},
   {tag: "宝骏", count: 15},
   {tag: "特斯拉", count: 4},
  {tag: "劳斯莱斯", count: 5},
  {tag: "保时捷", count: 8},
  {tag: "阿尔法・罗密欧", count: 2},
  {tag: "巴博斯", count: 1},
  {tag: "宝沃", count: 2},
  {tag: "北汽昌河", count: 11},
  {tag: "北汽绅宝", count: 11},
  {tag: "北汽制作", count: 8},
 
];
const total=25;
const pageSize = 100;
class TagList extends Component {
  state = {
    data: [],
    total: 0,
    page: 1,
    offset: 0,
    loading: true,
  };

  componentDidMount() {
    this.fetchData(1);
  }

  fetchData = (page=1) => {
    const url = `http://47.100.55.98/api/info/object?page_no=${page}&page_size=${pageSize}`;
    fetch(url)
      .then(res => res.json())
      .then((json) => {
        if(json.code === 200) {
          this.setState({
            data: json.data.result,
            total: json.data.total,
            loading: false
          })
        }
      })
    
    // setTimeout(() => {
      window.scrollTo(0, 0);
    // }, 1000);
  }

  changePage = (offset) => {
    const page = 1 + offset / pageSize;
    this.setState({ 
      offset: offset,
      page: page,
      // loading: true
    });
    this.fetchData(page);
  }

  render() {
    const { classes } = this.props;
    const { offset, loading} = this.state;
    return (
      loading ? (<div className={classes.progress}>
        <CircularProgress />
      </div>) : (
      <div>
        <Typography variant="subtitle1" component="h2" className={classes.title}>
          共计 {total} 个车辆品牌标签：
        </Typography>
        <Grid container className={classes.root}>
            { data.map((item, index) => (
              <Grid item xs={3} className={classes.grid} key={index}>
                <Link to={`/search/query/${item.tag}`} style={{textDecoration: 'none'}}>
                  <Chip
                    icon={<LabelOutlined style={{fontSize: '18px'}}/>}
                    label={item.tag}
                    color="primary"
                    className={classes.tag}
                    variant="outlined"
                    // component="a"
                    // href={`/search/tags/${item.tag}`}
                    clickable
                  />
                </Link>
                <Typography variant="caption" component="span">
                  × {item.count}
                </Typography>
                {/* <span> {item.count} </span> */}
               </Grid>
            ))}
        </Grid>
        <div className={classes.pagination}>
          <Pagination
            limit={pageSize}
            offset={offset}
            total={total}
            onClick={(event, offset) => this.changePage(offset)}
            otherPageColor="default"
            currentPageColor="secondary"
          />
        </div>
      </div>

      )

    )
  }
}

export default withStyles(style)(TagList);