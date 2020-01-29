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

const Shuffled = 'shuffled';
const Solved = 'solved';

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
  winTitle: {
    flexGrow: 1,
    color: '#3B0078',
    fontWeight: 'bold',
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

const logo = [
  {
    img: ZoovuZ,
    order: 0,
    subst: 0,
    board: 'shuffled',
  },
  {
    img: ZoovuO,
    order: 1,
    subst: 2,
    board: 'shuffled',
  },
  {
    img: ZoovuO,
    order: 2,
    subst: 1,
    board: 'shuffled',
  },
  {
    img: ZoovuV,
    order: 3,
    subst: 3,
    board: 'shuffled',
  },
  {
    img: ZoovuU,
    order: 4,
    subst: 4,
    board: 'shuffled',
  },
];

const isSolved = (solved: never[]) => {
  for (const i in solved) {
    if (solved[i] === undefined) {
      return false;
    }
    if (
      solved[i].order !== logo[i].order &&
      solved[i].subst !== logo[i].order
    ) {
      return false;
    }
  }
  return true;
};

const GamePage: React.FC = () => {
  const authenticated = isAuthenticated();
  const [shuffled, setShuffled] = useState([]);
  const [solved, setSolved] = useState([...Array(5)]);
  const [score, setScore] = useState(0);
  const [run, setRun] = useState(false);
  const [win, setWin] = useState(false);
  // dirty trick for handling refresh after d'n'd
  const [refresh, setRefresh] = useState(false);

  const classes = useStyles();

  const setupGame = () => {
    setShuffled(shufflePieces(logo));
    setSolved([...Array(5)]);
    setWin(false);
    setRun(false);
    setScore(0);
  };

  useEffect(() => {
    setShuffled(shufflePieces(logo));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (run) {
        setScore(score + 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [score, run]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (win) {
        setupGame();
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [win]);

  if (!authenticated) {
    return <Redirect to="/authorize" />;
  }

  const handleDrop = (e: any, index: number) => {
    if (solved[index]) {
      return;
    }

    const data = e.dataTransfer.getData('text').split('|');
    const pieceIndex = Number(data[0]);
    const pieceSource = data[1];

    let pieceData;
    if (pieceSource === Shuffled) {
      pieceData = shuffled[pieceIndex];
      if (pieceData !== undefined) {
        shuffled[pieceIndex] = undefined;
        setShuffled(shuffled);
      }
    } else {
      pieceData = solved[pieceIndex];
      if (pieceData !== undefined) {
        solved[pieceIndex] = undefined;
        setSolved(solved);
      }
    }

    solved.splice(index, 1, pieceData);
    setSolved(solved);
    if (
      pieceData !== undefined &&
      !(pieceData.order === index || pieceData.subst === index)
    ) {
      setScore(score + 10);
    }
    if (isSolved(solved)) {
      setRun(false);
      setWin(true);
    }
    e.dataTransfer.clearData();
    setRefresh(!refresh);
  };

  const handleDragStart = (e: any, index: number, source: string) => {
    if (!run) {
      setRun(true);
    }
    const dt = e.dataTransfer;
    dt.setData('text/plain', `${index}|${source}`);
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
        {win && (
          <Toolbar className={classes.toolbar}>
            <Typography
              variant="h3"
              color="inherit"
              noWrap
              className={classes.winTitle}
            >
              {`You did it!!! Your score is: ${score}s`}
            </Typography>
          </Toolbar>
        )}
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
                  <div
                    draggable
                    onDragStart={e => handleDragStart(e, i, Shuffled)}
                  >
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
                  <div
                    draggable
                    onDragStart={e => handleDragStart(e, i, Solved)}
                  >
                    <piece.img className={classes.icon} />
                  </div>
                )}
              </Grid>
            );
          })}
        </Grid>
      </Container>
      {refresh && <></>}
    </React.Fragment>
  );
};

export default GamePage;
