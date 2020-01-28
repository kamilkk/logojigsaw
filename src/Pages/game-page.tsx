// @ts-nocheck
import React, { useState } from 'react';
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

const GamePage: React.FC = () => {
  const authenticated = isAuthenticated();
  const [score, setScore] = useState(0);

  const classes = useStyles();

  if (!authenticated) {
    return <Redirect to="/authorize" />;
  }

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
          <Grid item key={'ZoovuO0'} xs={'auto'} sm={'auto'} md={'auto'}>
            <div className={classes.card}>
              <ZoovuO className={classes.icon} />
            </div>
          </Grid>
          <Grid item key={'ZoovuZ0'} xs={'auto'} sm={'auto'} md={'auto'}>
            <div className={classes.card}>
              <ZoovuZ className={classes.icon} />
            </div>
          </Grid>
          <Grid item key={'ZoovuV0'} xs={'auto'} sm={'auto'} md={'auto'}>
            <div className={classes.card}>
              <ZoovuV className={classes.icon} />
            </div>
          </Grid>
          <Grid item key={'ZoovuU0'} xs={'auto'} sm={'auto'} md={'auto'}>
            <div className={classes.card}>
              <ZoovuU className={classes.icon} />
            </div>
          </Grid>
          <Grid item key={'ZoovuO1'} xs={'auto'} sm={'auto'} md={'auto'}>
            <div className={classes.card}>
              <ZoovuO className={classes.icon} />
            </div>
          </Grid>
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
          <Grid item key={'Slot0'} xs={'auto'} sm={'auto'} md={'auto'}>
            <div className={classes.slot} />
          </Grid>
          <Grid item key={'Slot1'} xs={'auto'} sm={'auto'} md={'auto'}>
            <div className={classes.slot} />
          </Grid>
          <Grid item key={'Slot2'} xs={'auto'} sm={'auto'} md={'auto'}>
            <div className={classes.slot} />
          </Grid>
          <Grid item key={'Slot3'} xs={'auto'} sm={'auto'} md={'auto'}>
            <div className={classes.slot} />
          </Grid>
          <Grid item key={'Slot4'} xs={'auto'} sm={'auto'} md={'auto'}>
            <div className={classes.slot} />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default GamePage;
