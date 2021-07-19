class Hello extends React.Component {
    constructor(props){
      super(props);
      let {dataout}=this.props;
      console.log(dataout);
      this.state = {
            data: [
                { name: 'alarm', '设备': '未分类设备', '数量': dataout.typeData[0] },
                { name: 'alarm', '设备': '手环', '数量': dataout.typeData[1] },
                { name: 'alarm', '设备': '手表', '数量': dataout.typeData[2] },
                { name: 'alarm', '设备': '平衡车', '数量': dataout.typeData[3] },
                { name: 'alarm', '设备': '滑板车', '数量': dataout.typeData[4] },
                { name: 'alarm', '设备': '行车记录仪', '数量': dataout.typeData[5] },
                { name: 'alarm', '设备': '物流iot', '数量': dataout.typeData[6] },
                { name: 'alarm', '设备': '无人机', '数量': dataout.typeData[7] },
                { name: 'safety', '设备': '未分类设备', '数量': dataout.typeData[0] },
                { name: 'safety', '设备': '手环', '数量': dataout.typeData[1] },
                { name: 'safety', '设备': '手表', '数量': dataout.typeData[2] },
                { name: 'safety', '设备': '平衡车', '数量': dataout.typeData[3] },
                { name: 'safety', '设备': '滑板车', '数量': dataout.typeData[4] },
                { name: 'safety', '设备': '行车记录仪', '数量': dataout.typeData[5] },
                { name: 'safety', '设备': '物流iot', '数量': dataout.typeData[6] },
                { name: 'safety', '设备': '无人机', '数量': dataout.typeData[7] },
            ],
            pieData:[
              { item: '未分类设备', count: dataout.typeData[0],percent:dataout.typeData[0]/(dataout.typeData[0]+dataout.typeData[1]+dataout.typeData[2]+dataout.typeData[3]+dataout.typeData[4]+dataout.typeData[5]+dataout.typeData[6]+dataout.typeData[7]) },
              { item: '穿戴设备-手环', count: dataout.typeData[1],percent:dataout.typeData[1]/(dataout.typeData[0]+dataout.typeData[1]+dataout.typeData[2]+dataout.typeData[3]+dataout.typeData[4]+dataout.typeData[5]+dataout.typeData[6]+dataout.typeData[7])  },
              { item: '穿戴设备-手表', count: dataout.typeData[2],percent:dataout.typeData[2]/(dataout.typeData[0]+dataout.typeData[1]+dataout.typeData[2]+dataout.typeData[3]+dataout.typeData[4]+dataout.typeData[5]+dataout.typeData[6]+dataout.typeData[7])  },
              { item: '出行设备-平衡车', count: dataout.typeData[3],percent:dataout.typeData[3]/(dataout.typeData[0]+dataout.typeData[1]+dataout.typeData[2]+dataout.typeData[3]+dataout.typeData[4]+dataout.typeData[5]+dataout.typeData[6]+dataout.typeData[7])  },
              { item: '出行设备-滑板车', count: dataout.typeData[4],percent:dataout.typeData[4]/(dataout.typeData[0]+dataout.typeData[1]+dataout.typeData[2]+dataout.typeData[3]+dataout.typeData[4]+dataout.typeData[5]+dataout.typeData[6]+dataout.typeData[7])  },
              { item: '出行配件-行车记录仪',count: dataout.typeData[5],percent:dataout.typeData[5]/(dataout.typeData[0]+dataout.typeData[1]+dataout.typeData[2]+dataout.typeData[3]+dataout.typeData[4]+dataout.typeData[5]+dataout.typeData[6]+dataout.typeData[7])   },
              { item: '智能物流-物流iot', count: dataout.typeData[6],percent:dataout.typeData[6]/(dataout.typeData[0]+dataout.typeData[1]+dataout.typeData[2]+dataout.typeData[3]+dataout.typeData[4]+dataout.typeData[5]+dataout.typeData[6]+dataout.typeData[7])   },
              { item: '飞行设备-无人机', count: dataout.typeData[7],percent:dataout.typeData[7]/(dataout.typeData[0]+dataout.typeData[1]+dataout.typeData[2]+dataout.typeData[3]+dataout.typeData[4]+dataout.typeData[5]+dataout.typeData[6]+dataout.typeData[7])   },
            ],
            tDate:[
                { type: '汽车', value: 34 },
                { type: '建材家居', value: 85 },
                { type: '住宿旅游', value: 103 },
                { type: '交通运输与仓储邮政', value: 142 },
                { type: '建筑房地产', value: 251 },
                { type: '教育', value: 367 },
                { type: 'IT 通讯电子', value: 491 },
                { type: '社会公共管理', value: 672 },
                { type: '医疗卫生', value: 868 },
                { type: '金融保险', value: 1234 },
            ],
            datedata:[
              { month: 'Mon', city: '在线总量', 数量: 7 },
              { month: 'Tue', city: '在线总量', 数量: 3 },
              { month: 'Wed', city: '在线总量', 数量: 6 },
              { month: 'Thu', city: '在线总量', 数量: 4 },
              { month: 'Fre', city: '在线总量', 数量: 9 },
              { month: 'Sat', city: '在线总量', 数量: 5 },
              { month: 'Sun', city: '在线总量', 数量: 14 },
              { month: 'Mon', city: '设备总量', 数量: 10 },
              { month: 'Tue', city: '设备总量', 数量: 5 },
              { month: 'Wed', city: '设备总量', 数量: 9 },
              { month: 'Thu', city: '设备总量', 数量: 5 },
              { month: 'Fre', city: '设备总量', 数量: 9 },
              { month: 'Sat', city: '设备总量', 数量: 7 },
              { month: 'Sun', city: '设备总量', 数量: 14 },
              { month: 'Mon', city: '离线总量', 数量: 3 },
              { month: 'Tue', city: '离线总量', 数量: 2},
              { month: 'Wed', city: '离线总量', 数量: 3},
              { month: 'Thu', city: '离线总量', 数量: 1 },
              { month: 'Fre', city: '离线总量', 数量: 0 },
              { month: 'Sat', city: '离线总量', 数量: 2 },
              { month: 'Sun', city: '离线总量', 数量: 0},
            ],
            
            datafix:[
              { item: '未分类设备', 数量: dataout.typeData[0], },
              { item: '穿戴设备-手环', 数量: dataout.typeData[1],  },
              { item: '穿戴设备-手表', 数量: dataout.typeData[2],  },
              { item: '出行设备-平衡车', 数量: dataout.typeData[3],  },
              { item: '出行设备-滑板车', 数量: dataout.typeData[4],  },
              { item: '出行配件-行车记录仪', 数量: dataout.typeData[5],  },
              { item: '智能物流-物流iot', 数量: dataout.typeData[6],  },
              { item: '飞行设备-无人机', 数量: dataout.typeData[7],  },
            ]
            
      }
    }
    
    componentDidMount(){
        this.readHistogram()
        this.readPieChart()
        this.readt()
        this.readhuan()
        this.qipao()
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
            return val;
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
        container: 'container3',
        autoFit: true,
        height: 500,
      });
      
      chart.data(this.state.datedata);
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
    readhuan(){
      const { DataView } = DataSet;
      const dv = new DataView().source(this.state.datafix);
      let {dataout}=this.props;
      /* console.log(dataout); */
      dv.transform({
        type: 'fold',
        fields: ['数量'], // 展开字段集
        key: 'user', // key字段
        value: 'score', // value字段
      });
      const chart = new Chart({
        data:this.state.datafix,
        container: 'container4',
        autoFit: true,
        height: 500,
      });
      chart.data(dv.rows);
      chart.scale('score', {
        min: 0,
        max:dataout.typeData[0]+dataout.typeData[1]+dataout.typeData[2]+dataout.typeData[3]+dataout.typeData[4]+dataout.typeData[5]+dataout.typeData[6]+dataout.typeData[7],
      });
      chart.coordinate('polar', {
        radius: 0.8,
      });
      chart.axis('item', {
        line: null,
        tickLine: null,
      });
      chart.axis('score', {
        line: null,
        tickLine: null,
        grid: {
          line: {
            type: 'circle',
          },
        },
      });
      
      chart.tooltip({
        shared: true,
        showCrosshairs: true,
        crosshairs: {
          type: 'xy',
          line: {
            style: {
              stroke: '#565656',
              lineDash: [4],
            },
          },
          follow: true
        }
      });
      
      chart
        .line()
        .position('item*score')
        .color('user');
      chart
        .point()
        .position('item*score')
        .color('user')
        .shape('circle');
      chart.render();
    }
    qipao(){
      fetch('../../datattt.json')
    .then(res => res.json())
    .then(data => {
      const years = Object.keys(data);
      const colorsMap = {
        '未分类设备': '#f49d37',
        '穿戴设备': '#f03838',
        '出行设备': '#35d1d1',
        '出行配件-行车记录仪': '#5be56b',
        '智能物流-物流iot': '#4e7af0',
        '飞行设备-无人机': '#ebcc21',
      };
  
      let count = 0;
      let chart;
      let interval;
  
      function countUp() {
        const year = years[count];
        if (count === 0) {
          chart = new Chart({
            container: 'container5',
            autoFit: true,
            height: 500
          });
          chart.data(data[year]);
          chart.scale({
            life: {
              min: 0,
              max: 90,
              tickInterval: 10,
              alias: '数据量'
            },
            income: {
              type: 'log',
              max: 150000,
              min: 100,
              alias: '设备量'
            },
            country: {
              key: true // 自定义每条数据的 id
            },
            population: {
              type: 'pow',
              base: 2,
              alias: 'Message大小',
            },
            continent: {
              values: [
                '未分类设备',
                '穿戴设备',
                '出行设备',
                '出行配件-行车记录',
                '智能物流-物流iot',
                '飞行设备-无人机'
              ]
            }
          });
  
          // 配置 tooltip
          chart.tooltip({
            showMarkers: false,
            title: 'country'
          });
  
          // 配置图例
          chart.legend('population', false);
          chart.legend('continent', {
            flipPage: false,
            position: 'bottom-left'
          });
  
          // 坐标轴配置
          chart.axis('life', {
            title: {
              style: {
                fill: '#8C8C8C',
                fontSize: 14
              }
            },
            line: {
              style: {
                stroke: '#D9D9D9'
              }
            }
          });
          chart.axis('income', {
            title: {
              style: {
                fill: '#8C8C8C',
                fontSize: 14
              }
            },
            grid: {
              line: {
                style: {
                  stroke: '#D9D9D9'
                }
              }
            },
          });
  
          // 绘制散点图
          chart
            .point()
            .position('income*life')
            .color('continent', (val) => colorsMap[val])
            .size('population', [1, 25])
            .shape('circle')
            .animate({
              update: {
                duration: 200,
                easing: 'easeLinear'
              }
            })
            .tooltip('life*income*population')
            .style({
              stroke: '#000'
            });
  
          // 绘制标注文本
          chart.annotation().text({
            position: ['50%', '50%'],
            content: year,
            style: {
              fontSize: 200,
              fill: '#999',
              textAlign: 'center',
              fillOpacity: 0.3
            },
            top: false,
            animate: false,
          });
          chart.render();
        } else if (count < years.length) {
          chart.annotation().clear(true);
          chart.annotation().text({
            position: ['50%', '50%'],
            content: year,
            style: {
              fontSize: 200,
              fill: '#999',
              textAlign: 'center',
              fillOpacity: 0.3
            },
            top: false,
            animate: false,
  
          });
          chart.changeData(data[year]);
        }
  
        ++count;
  
        if (count === years.length) {
          clearInterval(interval);
        }
      }
  
      countUp();
      interval = setInterval(countUp, 200);
    });
    }
    render() {
      /* let {dataout}=this.props;
      console.log(dataout); */
      const itemStyle = {width: '49vw',height:'50vh',border:'1px solid #ccc'};
      const itemStyle3 = {width: '100vw',height:'50vh',border:'1px solid #ccc'};
      const divStyle = {display:'flex',flexWrap:'wrap',justifyContent:'space-between'};
      return (
        <div style = {divStyle}>
          <span>警告统计</span>
          <div style = {itemStyle} id="container"></div>
          <span>类型占比统计</span>
          <div style = {itemStyle} id="container2"></div>
          <span>上下线数量统计</span>
          <div style = {itemStyle3} id="container3"></div>
          <span>类型数量统计</span>
          <div style = {itemStyle3} id="container4"></div>
          <span>接收消息量</span>
          <div style = {itemStyle3} id="container5"></div>
        </div>
      );
    }
  }