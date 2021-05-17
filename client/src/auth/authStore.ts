import { action, makeObservable, observable } from 'mobx';
import { message } from '@library/message';
import { AuthService } from 'auth/auth.service';
import { UserService, User, UserContext } from '@components/user';
import { AppContext, AppService } from '@app';

export class AuthStore {
    loading = false;
    constructor(
        public authService: AuthService,
        public azureAuthService: AuthService,
        public userService: UserService,
        public appService: AppService,
    ) {
        makeObservable(this, {
            loading: observable,
            register: action,
            logIn: action,
            loadAppSettings: action,
        });

        this.validate();
    }

    validate = async () => {
        ;
        try {
            this.loading = true;
            const storedUser = this.authService.getUser();

            if (!storedUser) {
                this.authService.handleUnauthorized();
                return;
            }

            try {
                const user = await this.authService.reLogIn(storedUser);
                if (user?.user) {
                    UserContext.setLoggedInUser(user);
                    await this.loadAppSettings();
                } else {
                    this.authService.clear();
                    this.authService.handleUnauthorized();
                }
            } catch (e) {
                message.error('Something went wrong. Please try again letter');
            } finally {
                this.loading = false;
            }
        } finally {
            this.loading = false;
        }
    };

    loadAppSettings = async () => {
        const appService = new AppService();
        const appSettings = await appService.get();
        AppContext.setAppSettings(appSettings);
    };

    register = async (model: User, onRegister?: () => void) => {
        try {
            this.loading = true;
            await this.authService.register(model);
            if (onRegister) {
                onRegister();
            }
        } finally {
            this.loading = false;
        }
    };

    logIn = async (user?: User) => {
        try {
            this.loading = true;
            if (user != null) {
                await this.authService.logIn(user);
            } else {
                ;
                await this.azureAuthService.logIn();
            }
            await this.loadAppSettings();
            message.success(`Welcome`);
        } finally {
            this.loading = false;
        }
    };
}
