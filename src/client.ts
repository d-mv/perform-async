/* eslint-disable no-console */
import { performAsync } from './main';
import axios, { AxiosResponse } from 'axios';

const asyncFn = () => axios.get('http://www.google.com');

performAsync<AxiosResponse<string>>(asyncFn, {
  Some: payload => console.log(payload.data),
  None: _ => console.log('Some error happened: ', _),
});

const a = performAsync<AxiosResponse<string>>(asyncFn);

a({
  Some: payload => console.log(payload.data),
  None: () => console.log('Some error happened: '),
});
