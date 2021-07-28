import React, { Component } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import CreateRoomPage from './CreateRoomPage.js';

export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
      showSettings: false,
    };
    this.roomCode = this.props.match.params.roomCode;
    this.getRoomDetails();
    
    // method bindings go here
    this.getRoomDetails = this.getRoomDetails.bind(this);
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
    this.updateShowSettings = this.updateShowSettings.bind(this);
    this.renderSettingsButton = this.renderSettingsButton.bind(this);
    this.renderSettings = this.renderSettings.bind(this);
  }

  // methods go here
  getRoomDetails() {
    fetch('/api/get-room?code=' + this.roomCode)
    .then((response) => {
      if(!response.ok) {
        this.props.leaveRoomCallback();
        return this.props.history.push('/');
      }
      return response.json()
    })
    .then((data) => {
      this.setState({
        votesToSkip: data.votes_to_skip,
        guestCanPause: data.guest_can_pause,
        isHost: data.is_host,
      });
    });
  }

  leaveButtonPressed() {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    };

    fetch('/api/leave-room/', requestOptions)
    .then((_response) => {
      this.props.leaveRoomCallback();
      return this.props.history.push('/');
    });
  }

  updateShowSettings(value) {
    this.setState({
      showSettings: value,
    })
  }

  renderSettings() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align='center'>
          <CreateRoomPage update={true}
            votesToSkip={this.state.votesToSkip}
            guestCanPause={this.state.guestCanPause} 
            roomCode={this.state.roomCode}
            updateCallback={null}
          />
        </Grid>
        <Grid item xs={12} align='center'>
          <Button variant='contained' color='secondary' onClick={ () => this.updateShowSettings(false) }>
            Close
          </Button>
        </Grid>
      </Grid>
    )
  }

  renderSettingsButton() {
    return (
      <Grid item xs={12} align='center'>
        <Button variant='contained' color='primary' onClick={ () => this.updateShowSettings(true) }>
          Settings
        </Button>
      </Grid>
    )
  }

  render() {
    if (this.state.showSettings) {
      return this.renderSettings();
    }
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align='center'>
          <Typography variant='h4' component='h1'>
            Code: { this.roomCode }
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant='h6' component='h6'>
            Votes: {this.state.votesToSkip}
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant='h6' component='h6'>
            Guest Can Pause: {this.state.guestCanPause.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant='h6' component='h6'>
            Host?: {this.state.isHost.toString()}
          </Typography>
        </Grid>

        { this.state.isHost ? this.renderSettingsButton() : null }

        <Grid item xs={12} align='center'>
          <Button color='secondary' variant='contained' onClick={this.leaveButtonPressed}>
            Leave Room
          </Button>
        </Grid>
      </Grid>
    )
  }
}