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
class TagResult extends Component {
  state = {
    tag: this.props.match.params.tag,
    page: 1,
    data: [],
    offset: 0,
    total: 0,
    loading: true
  }

  componentDidMount() {
    this.fetchData(this.props.match.params.tag, 1);
  }

  componentWillReceiveProps(nextProps) {
    // console.log("query", nextProps.query);
    if(this.props.match.params.tag !== nextProps.match.params.tag) {
      this.setState({
        tag: nextProps.match.params.tag,
        page: 1,
        offset: 0,
        loading: true
      })
      this.fetchData(nextProps.match.params.tag, 1);
    }
  }
  
  /* fetchData = (tag, page=1) => {
    const url = `http://10.214.213.43:9999/getAllTag?page=${page}&size=${pageSize}&key=${tag}`;
    
    if(tag) {
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
    }
    
  } */
  fetchData = (tag, page=1) =>  {
    let option = {
      params: {
        key: tag,
        page_no:page,
        page_size:pageSize,
      }
  }
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
  }
  changePage = (offset) => {
    const page = 1 + offset / pageSize;
    this.setState({ 
      offset: offset,
      page: page,
      loading: true
    });
    this.fetchData(this.props.match.params.tag, page);
  }

  render() {
    const {classes} = this.props;
    const { tag, offset, data, total, loading } = this.state;
    return (
      loading ? 
      ( <div className={classes.progress}>
          <CircularProgress />
        </div>) : (
          <div>
            <Typography variant="subtitle1" component="h2" className={classes.total}>
              ?????? {total} ????????? [ {tag} ] ???????????????
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

export default withStyles(style)(TagResult);
