import { LOGIN_API, USER_API } from '../constants';

export function getAuthToken() {
  return localStorage.getItem('auth-token') || '';
}

export function setAuthToken(token) {
  localStorage.setItem('auth-token',token);
}

export async function fetchAPI({ method = 'POST', url, body = {}, headers = {}, responseType = 'json' }) {
  const opt = {
    method,
    headers: {
      Accept: responseType === 'blob' ? 'text/csv' : 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bear ${getAuthToken()}`,
    },
  };
  opt.headers = { ...opt.headers, ...headers };
  if (Object.keys(body).length) {
    opt.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(url, opt);
    
    if (responseType === 'blob' || responseType === 'text') {
      const data = responseType === 'blob' 
        ? await response.blob() 
        : await response.text();
      return { data, status: response.status };
    } else {
      const data = await response.json();
      return {...data, status: response.status};
    }
  } catch (error) {
    return { error };
  }
}

export async function fetchUser() {
  const userResponse = await fetchAPI({
    url: USER_API,
    body: {},
  });
  return userResponse;
}

export async function fetchToken({ eml, pwd }) {
  const response = await fetchAPI({
    url: LOGIN_API,
    body: { eml, pwd },
  });
  return response;
}

export async function checkUserToken() {
  const authToken = getAuthToken();
  if (authToken) {
    const userResponse = await fetchUser();
    return userResponse;
  }
  return null;
}