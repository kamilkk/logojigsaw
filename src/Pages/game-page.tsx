// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import { isAuthenticated, userName } from '../services/auth-service';
import { ZoovuO, ZoovuU, ZoovuV, ZoovuZ } from '../assets/icons';

const LogoSize = 5;

const useStyles = makeStyles(theme => ({
  '@global': {
    background: '#dddddd',
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
    marginTop: '20px',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #999999',
    margin: 'auto',
    padding: '20px',
    width: '160px',
    height: '160px',
  },
  slot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px dashed #11EE22',
    margin: 'auto',
    padding: '20px',
    width: '160px',
    height: '160px',
  },
  icon: {
    display: 'block',
    margin: 'auto',
  },
}));

const shufflePieces = (pieces: never[]) => {
  const shuffled = [...pieces];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = tmp;
  }

  return shuffled;
};

const iconList = [ZoovuZ, ZoovuO, ZoovuO, ZoovuV, ZoovuU];

const GamePage: React.FC = () => {
  //const authenticated = isAuthenticated();
  const [shuffled, setShuffled] = useState([]);
  const [solved, setSolved] = useState([...Array(5)]);
  const [score, setScore] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    const logo = [];
    for (let i = 0; i < LogoSize; i++) {
      logo.push({
        img: iconList[i],
        order: i,
        board: 'shuffled',
      });
    }
    setShuffled(shufflePieces(logo));
  }, []);

  // if (!authenticated) {
  //   return <Redirect to="/authorize" />;
  // }

  const handleDrop = (e: any, index: number) => {
    if (solved[index]) return;
    console.debug('handleDrop - shuffled', shuffled);
    console.debug('handleDrop - index', index);

    const pieceIndex = Number(e.dataTransfer.getData('text'));
    console.debug('handleDrop - pieceIndex', pieceIndex);
    let pieceData = shuffled[pieceIndex];
    console.debug('handleDrop - pieceData', pieceData);
    if (pieceData !== undefined) {
      const spliced = shuffled;
      console.debug('handleDrop - spliced before', spliced);
      spliced[pieceIndex] = null;
      console.debug('handleDrop - spliced after', spliced);
      setShuffled(spliced);
    } else {
      pieceData = solved[pieceIndex];
      console.debug('handleDrop - pieceData from solved', pieceData);
      if (pieceData !== undefined) {
        const spliced = solved;
        console.debug('handleDrop - spliced before (in solved)', spliced);
        spliced[pieceIndex] = null;
        console.debug('handleDrop - spliced after (in solved)', spliced);
        setSolved(spliced);
      }
    }
    const newSolved = solved;
    console.debug('handleDrop - newSolved before', newSolved);
    newSolved.splice(index, 1, pieceData);
    console.debug('handleDrop - newSolved after', newSolved);
    setSolved(newSolved);
    console.debug('handleDrop - solved shuffled', shuffled);
    console.debug('handleDrop - solved after', solved);
    setScore(score + 10);
  };

  const handleDragStart = (e, order) => {
    console.debug('handleDragStart - order', order);
    const dt = e.dataTransfer;
    dt.setData('text/plain', order);
    dt.effectAllowed = 'move';
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            {`Good luck, ${userName()}!`}
          </Typography>
          <AccessTimeIcon className={classes.link} />
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.link}
          >
            {`Your score: ${score} seconds`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" component="main">
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="body1"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Pick up the right card
          </Typography>
          <Typography
            variant="body1"
            color="inherit"
            noWrap
            className={classes.link}
          >
            The faster the better
          </Typography>
        </Toolbar>
        <Grid container spacing={2} alignItems="flex-end">
          {shuffled.map((piece, i) => {
            return (
              <Grid
                item key={`ZoovuI${i}`}
                xs={'auto'}
                sm={'auto'}
                md={'auto'}
                className={classes.card}
              >
                {piece && (
                  <div draggable onDragStart={e => handleDragStart(e, i)}>
                    <piece.img className={classes.icon} />
                  </div>
                )}
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="body1"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            ...and drop them to make the logo great again!
          </Typography>
        </Toolbar>
        <Grid container spacing={2} alignItems="flex-end">
          {solved.map((piece, i) => {
            return (
              <Grid
                item
                key={`Slot${i}`}
                xs={'auto'}
                sm={'auto'}
                md={'auto'}
                className={classes.slot}
                onDragOver={e => e.preventDefault()}
                onDrop={e => handleDrop(e, i)}
              >
                {piece && (
                  <div draggable onDragStart={e => handleDragStart(e, i)}>
                    <piece.img className={classes.icon} />
                  </div>
                )}
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default GamePage;
