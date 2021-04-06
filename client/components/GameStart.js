import React from 'react';
import SnakeGame from './SnakeApp/SnakeGame';
import FlappyCake from './FlappyCake';
import SortFruits from '../components/SortFruitsGame/SortFruits';
import Hangman from './HangmanGame/Hangman';
import Quiz from './Quiz';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Paper from '@material-ui/core/Paper';
import { fetchMiniGameComplete } from '../store/game';
import { connect } from 'react-redux';

const Start = (props) =>
  props.mini_status === 'finished' ? (
    ''
  ) : (
    <Box mb={3}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<PlayArrowIcon />}
        onClick={props.handleClick}
      >
        Start Game
      </Button>
    </Box>
  );
class GameStart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      miniGameComplete: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.game_type !== this.props.game_type) {
      this.setState({ gameStarted: false });
    }
  }
  handleClick() {
    this.setState({ gameStarted: true });
  }
  componentDidMount() {
    this.props.fetchMiniGameComplete();
  }
  render() {
    switch (this.props.game_type) {
      case 'snake':
        return (
          <Paper variant="outlined" m={2}>
            <h2>Snake Game:</h2>
            <p>
              Eat the food but don't hit the walls! The more food you eat, the
              faster you'll move!
            </p>
            {this.state.gameStarted ? (
              <SnakeGame />
            ) : (
              <Start
                mini_status={this.props.game.mini_status}
                handleClick={this.handleClick}
              />
            )}
          </Paper>
        );
      case 'flappy':
        return (
          <Paper elevation={10}>
            <h2>FlappyCake Game:</h2>
            <p>Press spacebar, up, or click to raise Penguin to catch cakes</p>
            {this.state.gameStarted ? (
              <FlappyCake />
            ) : (
              <Start
                mini_status={this.props.game.mini_status}
                handleClick={this.handleClick}
              />
            )}
          </Paper>
        );
      case 'hangman':
        return (
          <Paper elevation={10}>
            <h2>Hangman Game:</h2>
            <p>Game The Food Category</p>
            {this.state.gameStarted ? (
              <Hangman />
            ) : (
              <Start
                mini_status={this.props.game.mini_status}
                handleClick={this.handleClick}
              />
            )}
          </Paper>
        );
      case 'quiz':
        return (
          <Paper variant="outlined" square>
            <center>
              <h2>Test Your Knowledge!</h2>
              {this.state.gameStarted ? (
                <Quiz />
              ) : (
                <Start
                  mini_status={this.props.game.mini_status}
                  handleClick={this.handleClick}
                />
              )}
            </center>
          </Paper>
        );
      case 'sortfruits':
        return (
          <div>
            <h2>Sort the Foods!</h2>
            <p>
              Drag and drop each food into the "Good" or "Bad" column depending
              on whether it's "good" for the environment or "bad."
              <br />
              When you're done, press the "I'm done!" button.
            </p>

            {this.state.gameStarted ? (
              <SortFruits />
            ) : (
              <Start
                mini_status={this.props.game.mini_status}
                handleClick={this.handleClick}
              />
            )}
          </div>
        );
      default:
        return <></>;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    userId: state.auth.id,
    rests: state.rest.rests,
    game: state.game,
  };
};
const mapDispatchToProps = {
  fetchMiniGameComplete,
};
export default connect(mapStateToProps, mapDispatchToProps)(GameStart);
