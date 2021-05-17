export interface File {
    base64: string;
    type: string;
    name: string;
    base64Type: string;
}

export enum FileType {
    Excel = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

const downloadFile = (file: File) => {
    const anchorElement = document.createElement('a');
    anchorElement.setAttribute('download', file.name);
    anchorElement.href = `${file.base64Type};base64,${file.base64}`;
    const mouseEvent = document.createEvent('MouseEvents');
    mouseEvent.initMouseEvent(
        'click',
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null,
    );
    anchorElement.dispatchEvent(mouseEvent);
};

export const downloadExcelFile = (file: File) => {
    file.base64Type = 'data:application/octet-stream';
    return downloadFile(file);
};
