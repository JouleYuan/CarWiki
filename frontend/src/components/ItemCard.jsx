import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinkIcon from '@material-ui/icons/Link'
import { LabelOutlined } from '@material-ui/icons';
import Link from '@material-ui/core/Link';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

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

const catalogs = ["介绍", "官方文档", "博客文章", "项目实战", "视频教程", "技术问答"];

class ItemCard extends Component {
  render() {
    const { classes, data } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>

          <Link href={data.dong_url} color="inherit" target="_blank">
            <Box fontSize={32} fontWeight={1000} fontFamily="roboto" m={1}>
              {data.name}
            </Box>
          </Link>

          <div style={{ textAlign: "center" }}>
            <img src={data.picture} width="800"></img>
          </div>

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

          <Link href={data.dong_url} color="textSecondary" variant="caption" target="_blank">
            <LinkIcon style={{ fontSize: '16px', paddingRight: '5px' }} />
            {data.name} 厂商指导价：{data.min_price}~{data.max_price} {data.type} {data.size}
          </Link>




          {/* <Typography variant="caption" color="textSecondary" component="p" style={{ margin: '5px 0' }}>
            [ {catalogs[data.catalog]} ] {data.date}
          </Typography> */}

          <div>
            {
              data.tags && data.tags.map((tag, index) => (
                // <DomLink to={`/search/tags/${tag}`} style={{textDecoration: 'none'}} key={index}>
                <Chip
                  icon={<LabelOutlined style={{ fontSize: '18px' }} />}
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

export default withStyles(style)(ItemCard);