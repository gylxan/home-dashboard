import React from 'react';

import styles from './MapCard.module.css';
import Card from '../Card';
import Typography from '../Typography';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { CENTER } from '../../util/geoLocation';
import { getFormattedDate } from '../../util/date';
import { SkipboGame } from '../../interfaces/skipboGame';

export interface Props {
  title: string;
  games: SkipboGame[];
}

const MapCard: React.FC<Props> = ({ title, games }) => {
  return (
    <Card variant="outlined">
      <Card.Content>
        <div className={styles.Header}>
          <Typography variant="subtitle1">{title}</Typography>
        </div>
        <MapContainer className={styles.Map} center={CENTER} zoom={11} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {games.map((game) => (
            <Marker key={game._id} position={[game.location.latitude, game.location.longitude]}>
              <Popup>
                Spiel vom {getFormattedDate(game.playTime)}
                <br />
                Gewinner: {game.winner.name}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Card.Content>
    </Card>
  );
};

export default MapCard;
