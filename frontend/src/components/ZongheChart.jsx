import React, { Component } from 'react';
import ItemList from "./ItemList";
import CarnewsList from "./CarnewsList";
import Pagination from "material-ui-flat-pagination";
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { Divider } from '_@material-ui_core@4.12.1@@material-ui/core';
import emitter from "./ev"
import Filter from "../components/Filter";
import { Chart } from '@antv/g2';
class Hello extends React.Component {
  constructor(props){
    super(props);
    let {dataout}=this.props;
    let {datascore}=this.props;
    let {dataprice}=this.props;
    console.log(dataprice);
    this.state = {
          data: [
              { name: '资讯点击数', '设备': ""+dataout[0].floor+"~"+dataout[0].ceiling, '数量': dataout[0].num },
              { name: '资讯点击数', '设备':  ""+dataout[1].floor+"~"+dataout[1].ceiling, '数量': dataout[1].num },
              { name: '资讯点击数', '设备':  ""+dataout[2].floor+"~"+dataout[2].ceiling, '数量': dataout[2].num },
              { name: '资讯点击数', '设备':  ""+dataout[3].floor+"~"+dataout[3].ceiling, '数量': dataout[3].num },
              { name: '资讯点击数', '设备':  ""+dataout[4].floor+"~"+dataout[4].ceiling, '数量': dataout[4].num },
              { name: '资讯点击数', '设备':  ""+dataout[5].floor+"~"+dataout[5].ceiling, '数量': dataout[5].num },
              
          ],
          datareadt:[
            { country: ""+datascore[0].floor+"~"+datascore[0].ceiling, population: datascore[0].dong_num },
  { country: ""+datascore[1].floor+"~"+datascore[1].ceiling, population: datascore[1].dong_num },
  { country: ""+datascore[2].floor+"~"+datascore[2].ceiling, population: datascore[2].dong_num },
  { country: ""+datascore[3].floor+"~"+datascore[3].ceiling, population: datascore[3].dong_num },
  { country: ""+datascore[4].floor+"~"+datascore[4].ceiling, population: datascore[4].dong_num },
             ],
          tDate:[
              ],
              
               pieData:[
                { item: ""+dataprice[0].ceiling+"w内", count: dataprice[0].num,percent:dataprice[0].num/(dataprice[0].num+dataprice[1].num+dataprice[2].num+dataprice[3].num+dataprice[4].num) },
                { item: ""+dataprice[1].floor+"~"+dataprice[1].ceiling+"w", count: dataprice[1].num,percent:dataprice[1].num/(dataprice[0].num+dataprice[1].num+dataprice[2].num+dataprice[3].num+dataprice[4].num)  },
                { item: ""+dataprice[2].floor+"~"+dataprice[2].ceiling+"w", count: dataprice[2].num,percent:dataprice[2].num/(dataprice[0].num+dataprice[1].num+dataprice[2].num+dataprice[3].num+dataprice[4].num)  },
                { item: ""+dataprice[3].floor+"~"+dataprice[3].ceiling+"w", count: dataprice[3].num,percent:dataprice[3].num/(dataprice[0].num+dataprice[1].num+dataprice[2].num+dataprice[3].num+dataprice[4].num)  },
                { item: ""+dataprice[4].floor+"w以上", count: dataprice[4].num,percent:dataprice[4].num/(dataprice[0].num+dataprice[1].num+dataprice[2].num+dataprice[3].num+dataprice[4].num)  },
                ],
          datafix:[
              
          ]
          
    }
  }
  
  componentDidMount(){
      this.readHistogram()
      this.readtiao()
      this.readPieChart()
      /* this.readt() */
      /* this.readPieChart()
      this.readt()
      this.readhuan()
      this.qipao() */
  }
  readHistogram(){
      const chart = new Chart({
          container: 'container',
          autoFit: true,
      });
      chart.data(this.state.data);
      chart.scale('数量', {
        nice: true,
      });
      chart.tooltip({
        showMarkers: false,
        shared: true,
      });
      
      chart
        .interval()
        .position('设备*数量')
        .color('name')
        .adjust([
          {
            type: 'dodge',
            marginRatio: 0,
          },
        ]);
      
      chart.interaction('active-region');
      chart.render();
  }
  readPieChart(){
    const chart = new Chart({
      container: 'container2',
      autoFit: true,
  });
  chart.data(this.state.pieData);
  chart.coordinate('theta', {
    radius: 0.85
  });
  
  chart.scale('percent', {
    formatter: (val) => {
      val = val * 100 + '%';
      return ""+parseInt(val)+"%";
    },
  });
  chart.tooltip({
    showTitle: false,
    showMarkers: false,
  });
  chart.axis(false); // 关闭坐标轴
  const interval = chart
    .interval()
    .adjust('stack')
    .position('percent')
    .color('item')
    .label('percent', {
      offset: -40,
      style: {
        textAlign: 'center',
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)',
        fill: '#fff',
      },
    })
    .tooltip('item*percent', (item, percent) => {
      percent = percent * 100 + '%';
      return {
        name: item,
        value: percent,
      };
    })
    .style({
      lineWidth: 1,
      stroke: '#fff',
    });
  chart.interaction('element-single-selected');
  chart.render();
  
  // 默认选择
  interval.elements[0].setState('selected', true);
  }
   readt(){
    const chart = new Chart({
      container: 'container2',
      autoFit: true,
      height: 500,
    });
    
    chart.data(this.state.datareadt);
    chart.scale({
      month: {
        range: [0, 1],
      },
      temperature: {
        nice: true,
      },
    });
    
    chart.tooltip({
      showCrosshairs: true,
      shared: true,
    });
    
    chart.axis('数量', {
      label: {
        formatter: (val) => {
          return val + '台';
        },
      },
    });
    
    chart
      .line()
      .position('month*数量')
      .color('city')
      .shape('smooth');
    
    chart
      .point()
      .position('month*数量')
      .color('city')
      .shape('circle');
    
    chart.render();
  } 
  readtiao(){
    const chart = new Chart({
      container: 'container3',
      autoFit: true,
      height: 500,
    });
    
    chart.data(this.state.datareadt);
    chart.scale('population', { nice: true });
    chart.coordinate().transpose();
    chart.tooltip({
      showMarkers: false
    });
    chart.interaction('active-region');
    chart.interval().position('country*population');
    chart.render();
    
  }
  
  
  render() {
    /* let {dataout}=this.props;
    console.log(dataout); */
    const itemStyle = {width: '49vw',height:'50vh',border:'1px solid #ccc'};
    const itemStyle3 = {width: '100vw',height:'50vh',border:'1px solid #ccc'};
    const divStyle = {display:'flex',flexWrap:'wrap',justifyContent:'space-between'};
    return (
      <div style = {divStyle}>
        <span>品牌车辆价格统计</span>
        <div style = {itemStyle} id="container2"></div>
        <span>品牌车辆评分统计</span>
        <div style = {itemStyle3} id="container3"></div>
        
        <span>资讯统计</span>
        <div style = {itemStyle} id="container"></div>
        {/* <span>类型数量统计</span>
        <div style = {itemStyle3} id="container4"></div>
        <span>接收消息量</span>
        <div style = {itemStyle3} id="container5"></div> */}
      </div>
    );
  }
}
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

const catalogs = ["综合","", "找车", "找资讯"];
class ZongheChart extends Component {
  state = {
    query: this.props.query, 
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
   

  componentDidMount() {
    if(this.props.query)
      this.fetchData(this.props.query);
    this.eventEmitter = emitter.addListener("callMe", (msg) => {
        this.setState({
          size: msg
        })
        this.fetchData(this.props.query)
      });
  }


  componentWillReceiveProps(nextProps) {
    
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
      this.fetchData(nextProps.query);
    }
    /* this.fetchData(nextProps.query, 1); */
    
  }
  changeTime = (time) => {
    this.setState({time});
    console.log("time", time);
  }
  fetchData = (query) =>  {
    const input = query.input;

    let option = {
      params: {
        key: input,
      }
  }
/*   if(car_size!="全部")
    option.params.size=car_size;
  if(car_type!="全部")
    option.params.category=car_type;
    if(car_sort!="primary")
    option.params.sort=car_sort; */
    const url = `http://47.100.55.98/api/info/statistics`;
    let result = axios
      .get(url,option)
      .then(res =>{ 
        if(res.data.code===200){
          this.setState({
            data: res.data.data,
            loading: false
          })
          console.log(res.data.data);
        }
      });
      let optionnews = {
        params: {
          key: input,
        }
    }
/*     if(news_author!=0)
    optionnews.params.author=news_author;
    if(news_sourcefrom!=0)
    optionnews.params.source=news_sourcefrom;
    if(news_typecat!="all")
    optionnews.params.category=news_typecat;
    if(news_typecat!="primary")
    optionnews.params.sort=news_sort;
    console.log(optionnews); */
    const newsurl=`http://47.100.55.98/api/news/statistics`;
    let resultnews = axios
    .get(newsurl,optionnews)
    .then(resnews =>{ 
      if(resnews.data.code===200){
        this.setState({
          datanews: resnews.data.data.watch_count,
          loadingnews: false,
         
        })
        console.log(resnews.data.data.watch_count);
      }
    });
  }
 
  
  render() {
    
    const {classes, query} = this.props;
    const { offset, offsetnews,data, total, loading,datanews,loadingnews,totalnews,page,pagenews} = this.state;
    return (
      loading ? 
      ( <div className={classes.progress}>
          <CircularProgress />
        </div>) : (
        <div>
        <Hello dataout={datanews} datascore={data.score} dataprice={data.price}></Hello>
        </div>
      )
    )
  }
}

export default withStyles(style)(ZongheChart);
