export const DEFAULT_COLORS = ['#E3B505', '#95190C', '#107E7D', '#044B7F', '#6A7B76'];
//export const DEFAULT_COLORS = ['#E3B505', '#95190C', '#610345', '#107E7D', '#044B7F', '#6A7B76'];

const PLAYER_COLORS: { [player: string]: string } = {};

export const getPlayerColor = (playerName: string): string => {
  let playerColor = PLAYER_COLORS[playerName] || undefined;
  if (!playerColor) {
    PLAYER_COLORS[playerName] = DEFAULT_COLORS[Object.keys(PLAYER_COLORS).length];
    playerColor = PLAYER_COLORS[playerName];
  }
  return playerColor;
};
