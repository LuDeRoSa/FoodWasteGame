import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Facebook from './Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import Box from '@material-ui/core/Box';
import './Style/AuthForm.css';
/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {
    name,
    handleSubmit,
    error,
    displayName,
    autocomplete_attribute,
  } = props;
  return (
    <Grid
      container
      spacing={2}
      wrap="wrap"
      direction="column"
      alignItems="center"
      alignContent="center"
      justify="center"
      className="login-form"
      style={{ minHeight: '90vh' }}
    >
      <Paper variant="elevation" elevation={2} className="login-background">
        <Grid item id="login-grid">
          <form onSubmit={handleSubmit} name={name}>
            <Grid
              container
              direction="column"
              spacing={2}
              alignItems="center"
              justify="center"
            >
              <Grid item>
                <TextField
                  className="login-field"
                  type="email"
                  placeholder="Email"
                  name="username"
                  autoComplete="email"
                  variant="outlined"
                  required
                  autoFocus
                  // style={{ width: '250px' }}
                />
              </Grid>
              <Grid item>
                <TextField
                  className="login-field"
                  type="password"
                  name="password"
                  placeholder="Password"
                  variant="outlined"
                  autoComplete={autocomplete_attribute}
                  required
                />
              </Grid>
              <Grid item>
                {
                  <Button
                    id="submit-login-button"
                    style={{
                      maxWidth: '250px',
                      height: '40px',
                      textAlign: 'center',
                    }}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    {displayName}
                  </Button>
                }
              </Grid>
            </Grid>
          </form>
          <Box m={3} pt={10}>
            {/* <Grid item>
              <Facebook />
            </Grid> */}
            <Box pt={2}>
              <Grid item>
                {window.githubURL && (
                  <Button
                    className="login-button"
                    style={{
                      height: '40px',
                      textAlign: 'center',
                    }}
                    variant="contained"
                    color="primary"
                    startIcon={<GitHubIcon />}
                    href={window.githubURL}
                  >
                    GitHub
                  </Button>
                )}
              </Grid>
            </Box>
          </Box>
          {error && error.response && <div> {error.response.data} </div>}
        </Grid>
      </Paper>
    </Grid>
  );
};
/**
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    autocomplete_attribute: 'new-password',
    error: state.auth.error,
  };
};
const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    autocomplete_attribute: 'current-password',
    error: state.auth.error,
  };
};
const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticate(email, password, formName));
    },
  };
};
export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
