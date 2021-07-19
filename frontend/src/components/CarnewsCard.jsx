import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinkIcon from '@material-ui/icons/Link'
import { LabelOutlined } from '@material-ui/icons';
import Link from '@material-ui/core/Link';
// import { Link as DomLink } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';

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

const catalogs = ["文字","视频"];

class CarnewsCard extends Component {
  render() {
    const { classes, data } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Link href={data.url} color="primary" target="_blank">
          {/* <a href={data.url} rel="noopener noreferrer" target="_blank" style={{textDecoration: 'none'}}> */}
            <Typography gutterBottom variant="h5" component="h2" color="primary">
              {data.title}
            </Typography>
          {/* </a> */}
          </Link>
          <Typography variant="body2" color="textPrimary" component="p" className={classes.summary}>
            {data.summary}
          </Typography>
          <div>
            <div style={{width:'600px',height:'400px'}}>
          <img width="100%" height="100%" referrer="no-referrer|origin|unsafe-url" src={'https://images.weserv.nl/?url='+data.picture}/></div>
          </div>
          <Link href={data.url} color="textSecondary" variant="caption" target="_blank">
            <LinkIcon style={{fontSize: '16px', paddingRight: '5px'}}/>
            {data.source} · {data.author} · {data.url}
          </Link>
          <Typography variant="caption" color="textSecondary" component="p" style={{margin: '5px 0'}}>
            [ {data.category} ] {data.time} · 点击量：{data.watch_count}
          </Typography>
          <div>
            {
              data.tags && data.tags.map((tag, index) => (
                // <DomLink to={`/search/tags/${tag}`} style={{textDecoration: 'none'}} key={index}>
                  <Chip
                    icon={<LabelOutlined style={{fontSize: '18px'}}/>}
                    label={tag}
                    key={index}
                    color="primary"
                    className={classes.tag}
                    variant="outlined"
                    component="a"
                    href={`/search/tags/${tag}`}
                    clickable
                  />
                // </DomLink>      
              ))
            }
          </div>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(style)(CarnewsCard);