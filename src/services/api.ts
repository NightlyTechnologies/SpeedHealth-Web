import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const ibgeapi = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
});

export const mapquestapi = axios.create({
  baseURL: `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.REACT_APP_MAP_GUEST_API_KEY}&location=`,
});
