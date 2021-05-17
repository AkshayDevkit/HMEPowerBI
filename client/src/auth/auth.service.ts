import { message } from '@library/message';
import { Api } from '@components/base/api/base.api';
import { LoggedInUser, User, UserContext, UserService } from '@components/user';
import { AuthType, IAuthConfiguration } from './auth-types';
import { AzureAuthService } from './azure';
import { UsernamePasswordAuthService } from './username-password/username-password.auth.service';

export interface IAuthService {
    handleUnauthorized: () => void;
    logIn: (model?: any) => Promise<LoggedInUser>;
    logout: () => Promise<void>;
}

export class AuthService {
    userKey = 'userKey';
    routePath = 'authenticate';
    authService: IAuthService;

    constructor(public config: IAuthConfiguration, public userService: UserService) {
        switch (this.config.type) {
            case AuthType.Azure:
                {
                    this.authService = new AzureAuthService(config, this, userService);
                }
                break;
            case AuthType.UsernamePassword:
                {
                    this.authService = new UsernamePasswordAuthService(config, this, userService);
                }
                break;
            default:
                throw new Error('No IAuthService defined for ' + this.config.type);
        }
    }

    handleUnauthorized = (): void => {
        this.authService.handleUnauthorized();
    };

    reLogIn = async (storedUser: LoggedInUser): Promise<LoggedInUser | null> => {
        const user = await this.userService.get(storedUser.user?.id, {
            headers: {
                authorization: `Bearer ${storedUser.accessToken}`,
            },
        });
        return user === null
            ? null
            : new LoggedInUser(user, storedUser.accessToken, storedUser.configuration);
    };

    logIn = async (model?: any): Promise<void> => {
        const user = await this.authService.logIn(model);
        if (user) {
            this.setUser(user);
        }
    };

    logout = async (): Promise<void> => {
        this.clear();
        await this.authService.logout();
    };

    getUser = (): LoggedInUser | null => {
        const value = localStorage.getItem(this.userKey);
        return value ? JSON.parse(value) : null;
    };

    clear = (): void => {
        localStorage.removeItem(this.userKey);
    };

    authenticate = async (userId: string, password: string): Promise<LoggedInUser> => {
        return (
            await Api.post<LoggedInUser>(`${this.routePath}/login`, {
                userId: userId,
                password: password,
            })
        ).data;
    };

    register = async (t: User): Promise<void> => {
        const user = (await Api.post<LoggedInUser>(`${this.routePath}/register`, t)).data;
        message.success('User registered successfully, Logging in...');
        if (user) {
            this.setUser(user);
        }
    };

    private setUser = (user: LoggedInUser) => {
        localStorage.setItem(this.userKey, JSON.stringify(user));
        UserContext.setLoggedInUser(user);
    };
}
