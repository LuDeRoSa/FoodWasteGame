import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import PublicIcon from '@material-ui/icons/Public';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './Style/GameOver.css';

const styles = {
  root: {},
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};
class GameOver extends React.Component {
  render() {
    const { username } = this.props;
    const { game } = this.props;
    return (
      <Container style={styles.container}>
        <div className="game-over-heading">GAME OVER</div>
        <div className="score">
          Total Amount of Food Items Donated: {game.total_score}
        </div>
        <br />

        <div className="food-shelter">
          <img src="./img/food-donation.jpeg" />
        </div>

        <br />

        <div className="donation-text">
          Food pantries in New York City that you can help support!
        </div>

        <div className="donation-links">
          <p>
            New York Common Pantry{' '}
            <a href="https://nycommonpantry.org/donate-to-new-york-common-pantry/">
              Donate Here!
            </a>
            <br />
            Food Bank for New York City{' '}
            <a href="https://secure3.convio.net/fbnyc/site/Donation2;jsessionid=00000000.app30050b?df_id=8905&mfc_pref=T&8905.donation=form1&commas=yes&s_src=topmenu&_ga=2.206441175.55822074.1617727504-2002165381.1617727504&NONCE_TOKEN=3D2045D677ADD84139E791DA22CB4DC2">
              Donate Here!
            </a>
            <br />
            City Harvest{' '}
            <a href="https://secure.cityharvest.org/site/Donation2?2621.donation=form1&df_id=2621&mfc_pref=T">
              Donate Here!
            </a>
          </p>
        </div>

        <ButtonGroup orientation="vertical">
          <Button
            startIcon={<SportsEsportsIcon />}
            color="primary"
            component={Link}
            to="/landing"
          >
            Play New Game
          </Button>
          <Button
            startIcon={<AccountCircleIcon />}
            color="primary"
            component={Link}
            to="/profile"
          >
            Profile
          </Button>
          <Button
            startIcon={<PublicIcon />}
            color="primary"
            component={Link}
            to="/leadership"
          >
            Leadership Board
          </Button>
        </ButtonGroup>
      </Container>
    );
  }
}

const mapState = (state) => {
  return {
    username: state.auth.username,
    game: state.game,
  };
};

export default connect(mapState)(GameOver);
