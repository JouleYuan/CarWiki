import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    backgroundColor: '#2b263a',
      // boxShadow: '0 0 0 0',
     color: '#2D2D2D',
      // paddingTop: '20px'

  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function ChipsArray() {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Model Y' },
    { key: 1, label: '大众召回速腾' },
    { key: 2, label: '国内油价' },
    { key: 3, label: '滴滴出行”APP被下架' },
    { key: 4, label: '懂车帝' },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const handleclick = (data) => () => {
    console.log('链接被点击');
    const w=window.open("about:blank","_self");
    w.location.href=data.label
  };

  return (
    <Paper component="ul" className={classes.root}>
      {chipData.map((data) => {
        let icon;

        if (data.label === '懂车帝') {
          icon = <TagFacesIcon />;
        }

        return (
          <li key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete={data.label === '懂车帝' ? undefined : handleDelete(data)}
              onClick={handleclick(data)}
              className={classes.chip}
            />
          </li>
        );
      })}
    </Paper>
  );
}
