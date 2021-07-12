import React, { Component } from 'react';
import ItemList from "./ItemList";
import Pagination from "material-ui-flat-pagination";
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
const style = {
  pagination: {
    margin: '20px auto'
  },
  total: {
    color: '#7D7D7D',
    margin: '10px'
  },
  progress: {
    display: 'flex',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const pageSize = 10;
// const test = [
//   {
//     title: 'Spring 教程',
//     summary: 'Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run". We take an opinionated view of the Spring ...',
//     date: '2015-12-25',
//     source: 'CSDN',
//     url: 'www.csdn.com',
//     tags: [ 'spring', 'java', 'backend']
//   },
//   {
//     title: 'Spring 教程',
//     summary: 'Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run". We take an opinionated view of the Spring ...',
//     date: '2015-12-25',
//     source: 'CSDN',
//     url: 'www.csdn.com',
//     tags: [ 'spring', 'java', 'backend']
//   },
//   {
//     title: 'Spring 教程',
//     summary: 'Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run". We take an opinionated view of the Spring ...',
//     date: '2015-12-25',
//     source: 'CSDN',
//     url: 'www.csdn.com',
//     tags: [ 'spring', 'java', 'backend']
//   }
// ]

const catalogs = ["综合","", "找车", "找资讯"];
/* const fetchDataclq = (query, page=1) =>  {
  const input = query.input;
  const url = `http://47.100.55.98/api/info/object?key=${input}&page_no=${page}&page_size=${pageSize}`;
  let result = await axios
    .get(`http://47.100.55.98/api/info/object?key=%E5%A5%94%E9%A9%B0&page_no=1&page_size=10`)
    .then(res => {
      console.log(res);
      if (res.data.code === 0) {
        return res.data.data;
      } else {
        console.error("读取数据信息失败，" + res.data.message);
        return null;
      }
    })
    .catch(err => {
      console.error("读取数据信息失败");
    });
  if (result !== null && result !== undefined) {

  }
}; */
class SearchResult extends Component {
  state = {
    query: this.props.query, //query={{"input": input, "catalog": catalog, "time": time }}
    page: 1,
    data: [],
    offset: 0,
    total: 0,
    loading: true
  }

  componentDidMount() {
    if(this.props.query)
      this.fetchData(this.props.query, 1);
  }

  // componentDidUpdate() {
  //   window.scrollTo(0, 0);
  //   this.fetchData(this.props.query, 1);
  // }

  componentWillReceiveProps(nextProps) {
    // console.log("query", nextProps.query);
    if(this.props.query !== nextProps.query) {
      this.setState({
        query: nextProps.query,
        page: 1,
        offset: 0,
        loading: true
      })
      this.fetchData(nextProps.query, 1);
    }
    
  }

 /*  fetchData = (query, page=1) => {
    const input = query.input;
    const catalog = query.catalog || -1;
    const time = query.time || 0;
    const url = `http://47.100.55.98/api/info/object?key=${input}&page_no=${page}&page_size=${pageSize}`;
    fetch(url, {
    method: "GET",
  
  mode: "no-cors",
}).then(function(res) {
  if (res.status === 200) {
      return console.log(res)
  } else {
      return Promise.reject(res)
  }
}).then(function(data) {
  console.log(data);
}).catch(function(err) {
  console.log(err);
}); */
   /*  if(input) {
      fetch(url,{ mode: "no-cors" })
      .then(res => res.json())
      .then((json) => {
        if(json.code === 200) {
          this.setState({
            data: json.data.result,
            total: json.data.total,
            loading: false
          })
          console.log(json.data.result);
        }
      })
    }
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000); */
    
  /* } */
  fetchData = (query, page=1) =>  {
    const input = query.input;
    const catalog = query.catalog || -1;
    console.log(catalog);
    const url = `http://47.100.55.98/api/info/object?key=${input}&page_no=${page}&page_size=${pageSize}`;
    let result = axios
      .get(url)
      .then(res =>{ 
        if(res.data.code===200){
          this.setState({
            data: res.data.data.result,
            total: res.data.data.result.length,
            loading: false
          })
          console.log(res.data.data.result);
        }
      });
  }
  changePage = (offset) => {
    const page = 1 + offset / pageSize;
    this.setState({ 
      offset: offset,
      page: page,
      loading: true
    });
    this.fetchData(this.state.query, page);
  }

  render() {
    /* fetchDataclq(); */
    const {classes, query} = this.props;
    const { offset, data, total, loading } = this.state;
    return (
      loading ? 
      ( <div className={classes.progress}>
          <CircularProgress />
        </div>) : (
        <div>
        <Typography variant="subtitle1" component="h2" className={classes.total}>
          [ {catalogs[query.catalog + 1]} ] - 显示 {total} 条最优搜索结果
        </Typography>
        <ItemList data={data}/>
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

export default withStyles(style)(SearchResult);
