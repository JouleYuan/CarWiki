import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import image from '../assets/images/enter.png';
import xuanyi from '../assets/images/hotcar/xuanyi.png';
import kaluola from '../assets/images/hotcar/kaluola.png';
import aodi from '../assets/images/hotcar/aodiA6.png';
import baoma3 from '../assets/images/hotcar/baoma3.png';
import benchic from '../assets/images/hotcar/benchic.png';
import bentiancrv from '../assets/images/hotcar/bentiancrv.png';
import hafoH6 from '../assets/images/hotcar/hafoH6.png';
import maiteng from '../assets/images/hotcar/maiteng.png';
import modely from '../assets/images/hotcar/ModelY.png';
import tuguan from '../assets/images/hotcar/tuguan.png';
import Divider from '@material-ui/core/Divider';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks4Icon from '@material-ui/icons/Looks4';
import Looks5Icon from '@material-ui/icons/Looks5';
import Looks6Icon from '@material-ui/icons/Looks6';
import Filter7Icon from '@material-ui/icons/Filter7';
import Filter8Icon from '@material-ui/icons/Filter8';
import Filter9Icon from '@material-ui/icons/Filter9';
import Filter9PlusIcon from '@material-ui/icons/Filter9Plus';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 650,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));




const itemData = [
 {
      img: xuanyi,
      title: '轩逸',
      author: '8.18-13.7万',
      arg:'38371',
      rank: '1',
    },
    {
      img: kaluola,
      title: '卡罗拉',
      author: '10.68-15.68万',
      arg:'34699',
      rank: '2',
    },
    {
      img: hafoH6,
      title: '哈弗H6',
      author: '8.8-14.69万',
      arg:'25065',
      rank: '3',
    },{
      img: baoma3,
      title: '宝马3系',
      author: '28.22-40.18万',
      arg:'18575',
      rank: '4',
    },{
      img: bentiancrv,
      title: '本田CR-V',
      author: '16.13-26.06万',
      arg:'18282',
      rank: '5',
    },{
      img: aodi,
      title: '奥迪A6L',
      author: '35.06-55.58万',
      arg:'16632',
      rank: '6',
    },{
      img: tuguan,
      title: '途观L',
      author: '18.08-25.08万',
      arg:'16132',
      rank: '7',
    },
    {
      img: benchic,
      title: '奔驰C级',
      author: '30.78-47.48万',
      arg:'15248',
      rank: '8',
    },
    {
      img: modely,
      title: 'Model Y',
      author: '29.18-37.79万',
      arg:'12728',
      rank: '9',
    },{
      img: maiteng,
      title: '迈腾',
      author: '15.99-28.29万',
      arg:'12183',
      rank: '10',
    }
 ];
 function favor(fr){
  if(fr=='1'){
    return <a style={{color:"red"}} href="https://www.dongchedi.com/auto/series/1145"><LooksOneIcon/></a>;
  }else if(fr=='2'){
    return <a style={{color:"pink"}} href="https://www.dongchedi.com/auto/series/542"><LooksTwoIcon/></a>;
  }else if(fr=='3'){
    return <a style={{color:"purple"}} href="https://www.dongchedi.com/auto/series/649"><Looks3Icon/></a>;
  }else if(fr=='4'){
    return <a style={{color:"white"}} href="https://www.dongchedi.com/auto/series/145"><Looks4Icon/></a>;
  }else if(fr=='5'){
    return <a style={{color:"white"}} href="https://www.dongchedi.com/auto/series/279"><Looks5Icon/></a>;
  }else if(fr=='6'){
    return <a style={{color:"white"}} href="https://www.dongchedi.com/auto/series/99"><Looks6Icon/></a>;
  }else if(fr=='7'){
    return <a style={{color:"white"}} href="https://www.dongchedi.com/auto/series/404"><Filter7Icon/></a>;
  }else if(fr=='8'){
    return <a style={{color:"white"}} href="https://www.dongchedi.com/auto/series/212"><Filter8Icon/></a>;
  }else if(fr=='9'){
    return <a style={{color:"white"}} href="https://www.dongchedi.com/auto/series/4363"><Filter9Icon/></a>;
  }else{
    return <a style={{color:"white"}} href="https://www.dongchedi.com/auto/series/415"><Filter9PlusIcon/></a>;
  }
}
export default function TitlebarImageList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">热门车型</ListSubheader>
        </ImageListItem>
        <ImageList rowHeight={150} className={classes.imageList}>
        
        {/* <Divider/> */}
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img src={item.img} alt={item.title} />
            <ImageListItemBar
              title={item.title}
              subtitle={<span>价格:{item.author}<br/>销量:{item.arg}</span>}
              
              actionIcon={
                <IconButton aria-label={`info about ${item.title}`} className={classes.icon}>
                   {favor(item.rank)}
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
