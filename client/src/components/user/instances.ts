import { UserService } from './service';
import { UserStore } from './store';
import { UserSearchStore } from './search.store';
import { UserContextClass } from './context';

export const userService = new UserService();
const userContext = new UserContextClass(userService);
export const userStore = new UserStore(userService);
export const userSearchStore = new UserSearchStore(userStore);
export { userContext as UserContext };
