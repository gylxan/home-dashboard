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

