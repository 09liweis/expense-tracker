import { UserType } from '../types';

export default class User {
  private _id: string = '';
  private eml: string = '';
  private nm: string = '';
  private roles: Array<string> = [];
  constructor(user: UserType) {
    this._id = user._id;
    this.eml = user.eml;
    this.nm = user.nm;
    if (user.roles) {
      this.roles = user.roles;
    }
  }
  getName() {
    return this.nm;
  }
  isAdmin() {
    return this.roles.includes('admin');
  }
}
