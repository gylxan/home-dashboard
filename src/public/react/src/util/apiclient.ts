import axios, { AxiosResponse } from 'axios';
import { getAppVersion, setAppVersion } from './localStorage';
import { Code } from './error';

const HEADER_VERSION = 'x-client-version';
const appVersion = getAppVersion();

const client = axios.create({
  baseURL: '/api',
  headers: {
    Accept: 'application/json',
  },
});

client.interceptors.request.use(
  (request) => {
    request.headers[HEADER_VERSION] = appVersion;
    return request;
  },
  (error) => Promise.reject(error),
);

// Always unpack the payload (data) from the response and check the client version
client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    checkClientVersionError(error.response);
    return Promise.reject(error);
  },
);

/**
 * Checks if the error is a invalid client version error and reloads the page to load new client
 *
 * When the error is invalid client version error, we save the new version from the response header and reload the page
 * to get the new files for the client.
 * @param {AxiosResponse} response Response from axios
 */
const checkClientVersionError = (response: AxiosResponse): void => {
  if (response.status === 403 && response?.data?.error?.code === Code.InvalidClientVersion) {
    setAppVersion(response.headers[HEADER_VERSION]);
    window.location.reload();
  }
};

export default client;
