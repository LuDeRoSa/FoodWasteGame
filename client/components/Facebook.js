import React, { Component } from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { fbAuthenticate } from '../store';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
// import './Style/AuthForm.css';

class Facebook extends Component {
  constructor(props) {
    super(props);
  }

  componentClicked = () => {};

  responseFacebook = (response) => {
    let username = response.email;
    let id = response.id;
    this.props.fbAuthenticate(username, id);
  };
  render() {
    return (
      <div>
        {
          <FacebookLogin
            name="fb"
            appId="459306878548339"
            autoLoad={false}
            fields="name,email"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
            render={(renderProps) => (
              <Button
                className="login-button"
                variant="outlined"
                color="primary"
                style={{
                  // width: '300px',
                  height: '40px',
                  textAlign: 'center',
                }}
                variant="contained"
                color="primary"
                startIcon={<FacebookIcon />}
                onClick={renderProps.onClick}
              >
                Facebook
              </Button>
            )}
          />
        }
      </div>
    );
  }
}
const mapToDispatch = (dispatch) => {
  return {
    fbAuthenticate: (username, id) => dispatch(fbAuthenticate(username, id)),
  };
};
export default connect((state) => state, mapToDispatch)(Facebook);
