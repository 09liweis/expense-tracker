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

export const LANGUAGES = {
  en: {
    home: 'Home',
    knowledges: 'Knowledges',
    expenses: 'Expenses',
    login: 'Login',
    logout: 'Log Out',
    addNew: 'Add New',
    subscription: 'Subscription',
    todos: 'Todos',
    comments: 'Comments',
    blogs: 'Blogs',
    faq: 'FAQ',
    updating: 'Updating',
    update: 'Update',
    lost: 'Are you lost?',
    videos: 'Videos',
  },
  zh: {
    home: '页面',
    Resume: '简历',
    knowledges: '芝士',
    videos: 'Vlog',
    expenses: '消费',
    logout: '登出',
    total: '总计',
    addNew: '添加',
    subscription: '订阅',
    todos: '待办事项',
    comments: '评论',
    blogs: '博客',
    faq: '问答',
    updating: '更新中',
    update: '更新',
    lost: '你迷路了吗?',
    login: '登录'
  },
};

export function getLanguageKeys() {
  return [
    { k: 'en', v: 'English' },
    { k: 'zh', v: '中文' },
  ];
}

export function getLanguages(lang) {
  return LANGUAGES[lang];
}

export function getTranslate(lang, key) {
  return lang[key] || key;
}
