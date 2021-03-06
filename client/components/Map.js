import React from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import Marker from './Marker';
import InfoWindow from './InfoWindow';
import Snackbar from '@material-ui/core/Snackbar';

const styles = {
  snackBar: {
    color: 'white',
    width: '20px',
    height: '20px',
    display: 'flex',
    margin: '0 auto',
  },
};
class _Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      center: {
        lat:
          this.props.rests[this.props.gameStage - 1].restaurant_latitude ||
          40.7127281,
        lng:
          this.props.rests[this.props.gameStage - 1].restaurant_longitude ||
          -74.0060152,
      },
    };
    this.setCenter = this.setCenter.bind(this);
  }

  componentDidMount() {
    if (this.props.rests.length > 0) {
      this.setCenter(this.props.gameStage - 1);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.rests !== this.props.rests) {
      if (this.props.rests.length > 0) {
        this.setCenter(this.props.gameStage - 1);
      }
    }
    if (prevProps.gameStage !== this.props.gameStage) {
      this.setCenter(this.props.gameStage - 1);
    }
  }

  setCenter(index = this.props.gameStage) {
    let center = this.props.rests[index];
    if (!center) {
      console.log('cancelling setCenter');
      return null;
    }
    this.setState({
      center: {
        lat: center.restaurant_latitude,
        lng: center.restaurant_longitude,
      },
    });
  }
  createMapOptions(maps) {
    //these options create a frozen map. intention is to have the map move itself only to the new restarauns on its own
    return {
      panControl: false,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      gestureHandling: 'none',
      draggableCursor: 'default',
      styles: [
        {
          stylers: [
            { saturation: 0 },
            { gamma: 1 },
            { lightness: 4 },
            { visibility: 'on' },
          ],
        },
      ],
    };
  }

  render() {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignContent: 'space-between',
        }}
      >
        <center>
          <InfoWindow gameStage={this.props.gameStage} />
        </center>
        <div
          style={{
            height: '100%',
            width: '90%',
            margin: 'auto',
          }}
        >
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyCnNLEaNM_3zfMo0yHe - nINMSUPPfyJwUI',
            }}
            zoom={16}
            center={this.state.center}
            options={this.createMapOptions}
          >
            {this.props.rests.map((r, idx) => (
              <Marker
                key={r.id}
                name={r.restaurant_name}
                lat={r.restaurant_latitude}
                lng={r.restaurant_longitude}
                color={this.props.gameStage - 1 === idx ? 'red' : 'black'}
              />
            ))}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    rests: state.rest.rests,
    game: state.game,
    gameStage: state.game.gameStage,
  };
};
const mapDispatch = {};
export default connect(mapState, mapDispatch)(_Map);
