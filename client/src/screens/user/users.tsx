import {
    Users,
    userStore,
    userSearchStore,
    UserSearch,
} from '@components/user';
import { BaseListScreen } from '@screens/base';
import { UserRouter } from './user.router';

export const UsersScreen = () => {
    return (
        <BaseListScreen
            listComponent={Users}
            searchComponent={UserSearch as any}
            store={userStore as any}
            searchStore={userSearchStore as any}
            router={UserRouter}
        />
    );
};
