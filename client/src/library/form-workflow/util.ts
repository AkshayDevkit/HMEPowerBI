export const isPath = (key: string): boolean => {
    return new RegExp(`\\[|\\]&\\.`).test(key);
};

export const hasArrayPath = (key: string, path: string): boolean => {
    return new RegExp(`^${path}\\[|\\]&\\.`).test(key);
};

export const getArrayPaths = (key: string): string[] => {
    return key.split(new RegExp(`\\[|\\]|\\.`)).filter((x) => x);
};

export const getArrayFunctionPath = (key: string): string => {
    return getArrayPaths(key)
        .map((x) => `[${x}]`)
        .join('');
};

export const getIndexFromArrayPath = (path: string): number => {
    const numberPaths = getArrayPaths(path).filter((x: any) => !isNaN(x));
    return numberPaths.length > 0 ? parseInt(numberPaths[0]) : -1;
};

export const getNameFromArrayPath = (path: string): string => {
    const paths = getArrayPaths(path);
    return paths[paths.length - 1];
};

export const toPath = (
    arrayName: string,
    index: number,
    propertyName?: string,
) => {
    return propertyName
        ? `${arrayName}[${index}].${propertyName}`
        : `${arrayName}[${index}]`;
};

export const swapArray = (arr: any[], indexA: number, indexB: number) => {
    var temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
    return arr;
};

export const moveArray = (arr: any[], indexA: number, indexB: number) => {
    if (indexB >= arr.length) {
        var k = indexB - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(indexB, 0, arr.splice(indexA, 1)[0]);
    return arr;
};

export const addKeys = (array: any[]) => {
    if (!Array.isArray(array)) {
        return array;
    }
    array.forEach((x) => {
        x.key = !x.key ? Date.now() + Math.random() : x.key;
    });
    return array;
};
