export const enumToArray = (enumObject: any): { title: string; value: any }[] => {
    const keys = Object.keys(enumObject);
    const values = Object.values(enumObject) as any[];

    return values
        .filter((x, index) => typeof x === 'string')
        .map((x, index) => {
            return { title: x, value: values[index + values.length / 2] };
        });
};
