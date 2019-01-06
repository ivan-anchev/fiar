import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import uuid from 'uuid/v4';
import { CoreModule } from '../core.module';

// local storage key
const KEY = 'user_data';

@Injectable({
  providedIn: CoreModule
})
export class UserService {
  /**
   * Get current user from local storage (if any)
   * @return <User> current user
   */
  getCurrent(): User {
    const userData = localStorage.getItem(KEY);
    if (userData) {
      return JSON.parse(userData);
    }

    const user: User = {
      id: uuid(),
      name: '',
      avatar: 'man',
    };
    this.saveCurrent(user);

    return { name: '', avatar: 'man', id: uuid() };
  }

  /**
   * Save current user to local storage
   * @param user <User> user object to save
   */
  saveCurrent(user: User): void {
    localStorage.setItem(KEY, JSON.stringify(user));
  }

  /**
   * Remove current user from localStorage
   */
  removeCurrent(): void {
    localStorage.removeItem(KEY);
  }
}
