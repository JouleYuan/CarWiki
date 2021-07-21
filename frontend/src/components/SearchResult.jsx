import React, { Component } from 'react';
import ItemList from "./ItemList";
import CarnewsList from "./CarnewsList";
import Pagination from "material-ui-flat-pagination";
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { Divider } from '@material-ui/core';
import emitter from "./ev"
import Filter from "../components/Filter";
import ZongheCar from './ZongheCar';
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

const catalogs = ["综合","", "找车", "找资讯","车辆详细资讯"];
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
    pagenews:1,
    data: [],
    datanews:[],
    offset: 0,
    offsetnews: 0,
    total: 0,
    totalnews:0,
    loading: true,
    loadingnews:true,
    time: 0,
    size: "SUV",
  }
   // 组件销毁前移除事件监听
   /* componentWillUnmount() {
    emitter.removeListener(this.eventEmitter);
  } */

  componentDidMount() {
    if(this.props.query)
      this.fetchData(this.props.query, 1,1);
    this.eventEmitter = emitter.addListener("callMe", (msg) => {
        this.setState({
          size: msg
        })
        this.fetchData(this.props.query, 1,1)
      });
  }

  // componentDidUpdate() {
  //   window.scrollTo(0, 0);
  //   this.fetchData(this.props.query, 1);
  // }

  componentWillReceiveProps(nextProps) {
    console.log("query", nextProps.query);
    if(this.props.query !== nextProps.query) {
      this.setState({
        query: nextProps.query,
        page: 1,
        pagenews:1,
        offset: 0,
        offsetnews: 0,
        loading: true,
        loadingnews:true,
      })
      this.fetchData(nextProps.query, 1,1);
    }
    /* this.fetchData(nextProps.query, 1); */
    
  }
  changeTime = (time) => {
    this.setState({time});
    console.log("time", time);
  }
  fetchData = (query,page,pagenews) =>  {
    const input = query.input;
    const catalog = query.catalog || -1;
    const news_author=query.news_author;
    const news_sourcefrom=query.news_sourcefrom;
    const news_typecat=query.news_typecat;
    const news_sort=query.news_sort;
    const car_size=query.car_size;
    const car_type=query.car_type;
    const car_sort=query.car_sort;
    console.log(catalog);
    let option = {
      params: {
        /* key: input, */
        page_no:page,
        page_size:pageSize,
      }
  }
  if(input!="全部")
    option.params.key=input;
  if(car_size!="全部")
    option.params.size=car_size;
  if(car_type!="全部")
    option.params.category=car_type;
    if(car_sort!="primary")
    option.params.sort=car_sort;
    const url = `http://47.100.55.98/api/info/object`;
    let result = axios
      .get(url,option)
      .then(res =>{ 
        if(res.data.code===200){
          this.setState({
            data: res.data.data.result,
            total: res.data.data.allResultNum,
            loading: false
          })
          console.log(res.data.data.result);
        }
      });
      let optionnews = {
        params: {
          key: input,
          page_no:pagenews,
          page_size:pageSize,
          /* author:news_author===0? "言车一社":"言车一社", */
        }
    }
    if(news_author!=0)
    optionnews.params.author=news_author;
    if(news_sourcefrom!=0)
    optionnews.params.source=news_sourcefrom;
    if(news_typecat!="all")
    optionnews.params.category=news_typecat;
    if(news_typecat!="primary")
    optionnews.params.sort=news_sort;
    console.log(optionnews);
    const newsurl=`http://47.100.55.98/api/news/object`;
    let resultnews = axios
    .get(newsurl,optionnews)
    .then(resnews =>{ 
      if(resnews.data.code===200){
        this.setState({
          datanews: resnews.data.data.result.filter(function(a) {
            /* if(query.catalog!=2)
              query.time =0 */
            if(query.catalog!=2 || query.time ===0)
              return a.time
            else{console.log(query.time)
            return a.time > query.time} ;
          }),
          totalnews:resnews.data.data.allResultNum,
          loadingnews: false,
         
        })
        console.log(resnews.data.data.result);
      }
    });
  }
 
  
  render() {
    
    var date = new Date();
var year=date.getFullYear(); 
var mon=date.getMonth()+1;
var day=date.getDate();
var h=date.getHours(); 
var m=date.getMinutes();
var s=date.getSeconds(); 
    var submitTime = "";
submitTime += year + "-";
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
        }
    const {classes, query} = this.props;
    const { offset, offsetnews,data, total, loading,datanews,loadingnews,totalnews,page,pagenews} = this.state;
    const changePage = (offset,pagenews) => {
      const page = 1 + offset / pageSize;
     /*  const pagenews = 1 + offset / pageSize; */
      this.setState({ 
        offset: offset,
        page: page,
        pagenews:pagenews,
        loading: true,
        loadingnews:true
      });
      this.fetchData(this.state.query, page,pagenews);
    }
    const changenewsPage = (offsetnews,page) => {
      const pagenews = 1 + offsetnews / pageSize;
      this.setState({ 
        offsetnews: offsetnews,
        page: page,
        pagenews:pagenews,
        loading: true,
        loadingnews:true
      });
      this.fetchData(this.state.query, page,pagenews);
    }
    function favor(fr){
    if(fr<=0){
      return <div>
      <Typography variant="subtitle1" component="h2" className={classes.total}>
        [ {catalogs[query.catalog + 1]} ] - 显示 {total} 条最优搜索结果
      </Typography>
      <ZongheCar data={data}/>
      <div className={classes.pagination}>
        <Pagination
          limit={pageSize}
          offset={offset}
          total={total}
          onClick={(event, offset) => changePage(offset,pagenews)}
          otherPageColor="default"
          currentPageColor="secondary"
        />
      </div>
      {/* <ItemList data={data}/>
      <div className={classes.pagination}>
        <Pagination
          limit={pageSize}
          offset={offset}
          total={total}
          onClick={(event, offset) => changePage(offset,pagenews)}
          otherPageColor="default"
          currentPageColor="secondary"
        />
      </div> */}
      <Divider/>
      <Typography variant="subtitle1" component="h2" className={classes.total}>
        [ {catalogs[query.catalog + 1]} ] - 显示 {totalnews} 条最优搜索结果
      </Typography>
      <CarnewsList data={datanews}/>
      <div className={classes.pagination}>
        <Pagination
          limit={pageSize}
          offset={offsetnews}
          total={totalnews}
          onClick={(event, offset) => changenewsPage(offset,page)}
          otherPageColor="default"
          currentPageColor="secondary"
        />
      </div>
      </div>;
    }else if(fr==1){
      return <div>
      <Typography variant="subtitle1" component="h2" className={classes.total}>
        [ {catalogs[query.catalog + 1]} ] - 显示 {total} 条最优搜索结果
      </Typography>
      <ItemList data={data}/>
      <div className={classes.pagination}>
        <Pagination
          limit={pageSize}
          offset={offset}
          total={total}
          onClick={(event, offset) => changePage(offset,pagenews)}
          otherPageColor="default"
          currentPageColor="secondary"
        />
      </div>
      </div>;
    }else if(fr==2){
      return <div>
      <Typography variant="subtitle1" component="h2" className={classes.total}>
        [ {catalogs[query.catalog + 1]} ] - 显示 {totalnews} 条最优搜索结果
      </Typography>
      <CarnewsList data={datanews}/>
      <div className={classes.pagination}>
        <Pagination
          limit={pageSize}
          offset={offsetnews}
          total={totalnews}
          onClick={(event, offset) => changenewsPage(offset,page)}
          otherPageColor="default"
          currentPageColor="secondary"
        />
      </div>
      </div>;
    }else if(fr==3){
      return <div>
      <Typography variant="subtitle1" component="h2" className={classes.total}>
        [ {catalogs[query.catalog + 1]} ] - 显示 {totalnews} 条最优搜索结果
      </Typography>
      <CarnewsList data={datanews}/>
      <div className={classes.pagination}>
        <Pagination
          limit={pageSize}
          offset={offsetnews}
          total={totalnews}
          onClick={(event, offset) => changenewsPage(offset,page)}
          otherPageColor="default"
          currentPageColor="secondary"
        />
      </div>
      </div>;
    }
  }
    return (
      loading ? 
      ( <div className={classes.progress}>
          <CircularProgress />
        </div>) : (
        <div>
        {favor(query.catalog)}
        </div>
      )
    )
  }
}

export default withStyles(style)(SearchResult);
