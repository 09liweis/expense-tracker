export interface UserType {
  _id: string;
  nm: string;
  eml: string;
  lts: string;
  roles?: Array<string>;
}

export interface BlogType {
  // _id?: string;
  // title?: string;
  // url?: string;
  // excerpt?: string;
  // className?: string;
  // created_at?: string;
  // content?: string;
  // projectName?: string;
  // projectUrl?: string;
  [key: string]: string;
}

export const emptyUser: UserType = { _id: '', nm: '', eml: '', lts: '' };

export interface LoginFormProps {
  setUser: Function;
  setShowLogin: Function;
}

export interface HeaderProps {
  user: UserType;
  setUser: Function;
  setShowLogin: Function;
  router: { pathname: String };
  lang: String;
}

export interface Transaction {
  _id?: string;
  price?: string;
  formatedPrice?: string;
  income?:boolean;
  date?: string;
  title?: string;
  place?: {
    _id?: string;
    name?: string;
    address?: string;
    place_id?: string;
    lat?: number;
    lng?: number;
  };
}

export interface ExpenseResponse {
  total: string;
  incomes:string;
  expenses:string;
  date:string;
  endDate?:string;
  categoryPrice:CategoryTransaction[]
}

export interface CategoryTransaction {
  total: string;
  income: boolean;
  category: string;
  percentage: string;
  items: Transaction[];
}

export interface ExpenseListProps {
  categoryTransactions: CategoryTransaction[];
  openTransactionDetail: Function;
}

export interface Knowledge {
  _id?: string;
  title: string;
  definition: string;
  categories: string[];
  createdAt?: string;
  updatedAt?: string;
}