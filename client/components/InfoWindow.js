import React, { Component } from 'react';
import { connect } from 'react-redux';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import IconButton from '@material-ui/core/IconButton';
import { addFavorite } from '../store/favorites';

import './Style/InfoWindow.css';

class InfoWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.game.gameStage - 1,
      show: false,
      clicked: false,
    };
  }

  addFav() {
    this.setState({
      show: !this.state.show,
      clicked: true,
    });
    this.props.addFavorite(this.props.rest.rests[this.state.index].id);
  }

  render() {
    const restaurantName = this.props.rest.rests[this.state.index]
      .restaurant_name;
    const restId = this.props.rest.rests[this.state.index].id;
    return this.props.show ? (
      <div className='info' style={{ width: 50, height: 80 }}>
        {restaurantName}
        <br />
        <IconButton onClick={() => this.addFav(restId)}>
          {!this.state.clicked && (
            <FavoriteBorderOutlinedIcon
              style={{
                fontSize: 20,
              }}
            />
          )}
          {this.state.clicked && (
            <FavoriteOutlinedIcon
              style={{
                fontSize: 20,
              }}
            />
          )}
        </IconButton>
      </div>
    ) : null;
  }
}

const mapToDispatch = (dispatch) => {
  return {
    addFavorite: (restId) => dispatch(addFavorite(restId)),
  };
};

export default connect((state) => state, mapToDispatch)(InfoWindow);
