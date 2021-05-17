import { BaseStore } from '@components/base/stores/base.store';
import { UserService } from './service';
import { User } from './types';

export class UserStore extends BaseStore<User> {
    defaultValues: any = {
        id: '',
        name: '',
    };
    constructor(public userService: UserService) {
        super(userService);
    }
}
