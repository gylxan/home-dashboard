export const DEFAULT_COLORS = ['#107E7D', '#95190C', '#E3B505', '#044B7F', '#6A7B76', '#610345'];

const PLAYER_COLORS: { [player: string]: string } = {};

export const getPlayerColor = (playerName: string): string => {
  let playerColor = PLAYER_COLORS[playerName] || undefined;
  if (!playerColor) {
    PLAYER_COLORS[playerName] = DEFAULT_COLORS[Object.keys(PLAYER_COLORS).length];
    playerColor = PLAYER_COLORS[playerName];
  }
  return playerColor;
};
