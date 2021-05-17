import { Observer } from 'mobx-react-lite';

export const Debug = ({
    value,
    replacer,
    space = 4,
}: {
    value: any;
    replacer?: (number | string)[] | null;
    space?: string | number;
}) => {
    return (
        <Observer>
            {() => <div>{JSON.stringify(value, replacer, space)}</div>}
        </Observer>
    );
};
