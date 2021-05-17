import { ReactNode } from 'react';

export interface BaseRoute {
    path: string;
    redirect: (args: any) => string;
}

export interface Routes {
    root: BaseRoute;
    new: BaseRoute;
    edit: BaseRoute;
}

export abstract class BaseRouter<T extends Routes> {
    abstract baseRouteName: string;
    abstract customRoutes: { [key: string]: BaseRoute } | null;
    abstract Router: ReactNode;

    getCurrentRoute = () => {
        const routes = this.baseRouteName.split('/');
        return routes.length > 1 ? routes[routes.length - 1] : routes[0];
    };

    getBaseRoutes(): Routes {
        return {
            root: {
                path: `/${this.baseRouteName}`,
                redirect: (args: any) => '',
            },
            new: {
                path: `/${this.baseRouteName}/new`,
                redirect: (args: any) => '',
            },
            edit: {
                path: `/${this.baseRouteName}/:id`,
                redirect: (args: { id: string }) => {
                    const path =
                        args && args.id
                            ? `${this.getCurrentRoute()}/${args.id}`
                            : `/${this.getCurrentRoute()}`;
                    return path;
                },
            },
        };
    }

    getRoutes(): T {
        return {
            ...(this.customRoutes || {}),
            ...this.getBaseRoutes(),
        } as any;
    }
}
