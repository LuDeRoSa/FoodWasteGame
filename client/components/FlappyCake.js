import React, { Component } from 'react';
import { updateMiniGameScore } from '../store/game';
import { connect } from 'react-redux';
import './Style/FlappyCake.css';

const getRandomCoordinates = () => {
  let min = 5;
  let max = 350;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return y;
};

const penguin = new Image();
penguin.src = './img/player.png';
const cupcake = new Image();
cupcake.src = './img/cupcake.png';

class FlappyCake extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gravity: 0.8,
      lift: -15,
      bird: {
        x: 50,
        y: 100,
        velocity: 0,
        radius: 20,
      },
      cakes: [{ x: 325, y: 100 }],
      cakespeed: 1,
      score: 0,
      playing: true,
    };
    this.canvasRef = React.createRef();
    this.onKey = this.onKey.bind(this);
    this.onPoint = this.onPoint.bind(this);
  }

  componentDidMount() {
    if (!this.state.playing) {
      return;
    }
    this.interval = setInterval(() => {
      this.update();
      this.draw();
    }, 1000 / 60);
    document.addEventListener('keydown', this.onKey);
    document.addEventListener('pointerdown', this.onPoint);
  }

  componentDidUpdate() {
    if (!this.state.playing) {
      return;
    }
  }
  onKey(e) {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      this.bump(e);
    }
  }
  onPoint(e) {
    if (e.target.tagName === 'CANVAS') {
      this.bump(e);
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    document.removeEventListener('click', this.onClick);
    document.removeEventListener('keydown', this.onKey);
    document.removeEventListener('touchstart', this.onTouch);
    this.setState({
      playing: false,
    });
  }
  bump(e) {
    e.preventDefault();
    this.setState({
      bird: {
        x: 50,
        y: this.state.bird.y,
        velocity: this.state.bird.velocity + this.state.lift,
        radius: 20,
      },
    });
  }
  update = () => {
    if (!this.state.playing) {
      return;
    }
    const node = this.canvasRef.current;
    let newV = (this.state.bird.velocity + this.state.gravity) * 0.9;
    this.setState((state) => {
      return {
        bird: {
          x: 50,
          y: Math.max(
            Math.min(state.bird.y + newV, node.height - state.bird.radius),
            0
          ),
          velocity: newV,
          radius: 20,
        },
        cakes: state.cakes.map((cake) => {
          cake.x = cake.x - 5;
          return cake;
        }),
      };
    });

    this.state.cakes.forEach((cake) => {
      if (
        Math.abs(cake.y - this.state.bird.y) < 50 &&
        Math.abs(cake.x - this.state.bird.x) < 50
      ) {
        this.setState((state) => {
          const cake = {
            x: 350,
            y: getRandomCoordinates(),
          };
          return {
            score: state.score + 1,
            cakes: [cake],
            cakespeed: state.cakespeed + 1,
          };
        });
      }
      if (cake.x === 0) {
        this.setState({ playing: false });
        this.gameover();
      }
    });
  };
  draw = () => {
    if (!this.state.playing) {
      return;
    }
    const node = this.canvasRef.current;
    const ctx = node.getContext('2d');
    ctx.fillStyle = 'skyblue';
    ctx.fillRect(0, 0, node.width, node.height);
    ctx.drawImage(penguin, this.state.bird.x, this.state.bird.y, 50, 50);
    this.state.cakes.forEach((cake) => {
      ctx.drawImage(cupcake, cake.x, cake.y, 50, 50);
    });
  };
  gameover() {
    this.props.updateMiniGameScore(this.state.score);
  }
  render() {
    if (!this.state.playing) {
      return (
        <div id="game-message">
          Good game! You earned {this.state.score} points
        </div>
      );
    }
    return (
      <div id="flappy-instructions">
        Use the spacebar or touch/click to fly the penguin so he can catch the
        cakes.
        <div id="flappy-game-area">
          <canvas ref={this.canvasRef} width={350} height={400} />
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    state,
  };
};

const mapDispatch = {
  updateMiniGameScore,
};

export default connect(mapState, mapDispatch)(FlappyCake);
