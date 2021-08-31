import { LatLngTuple } from 'leaflet';

export const watchPosition = (
  successCallback: (position: GeolocationPosition) => void,
  errorCallback?: (error?: GeolocationPositionError) => void,
) => {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(successCallback, errorCallback);
    return;
  }
  errorCallback?.();
};

export const CENTER = [52.520008, 13.404954] as LatLngTuple;
