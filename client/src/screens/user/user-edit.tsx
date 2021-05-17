import { UserEdit as UserEditComponent, userStore } from '@components/user';
import { BaseEdit } from '@screens/base';
import { UserRouter } from './user.router';

export const UserEdit = () => {
    return (
        <BaseEdit
            component={UserEditComponent as any}
            store={userStore as any}
            router={UserRouter}
        />
    );
};
