export const API_URL = "https://samliweisen.onrender.com/api/";

export const LOGIN_API = `${API_URL}user/login`;

export const USER_API = `${API_URL}user/detail`;

export const EXPENSE_LIST_API = `${API_URL}transactions/statistics`;

export const EXPENSE_NEW_API = `${API_URL}transactions/new`;

export const EXPENSE_UPDATE_API = (id: string) =>
  `${API_URL}transactions/${id}`;

export const EXPENSE_DELETE_API = (id: string) =>
  `${API_URL}transactions/${id}`;

export const EXPENSE_CATEGORIES_API = `${API_URL}transactions/categories`;

export const TODO_LIST_API = `${API_URL}todos`;
