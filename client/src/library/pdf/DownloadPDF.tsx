import { ReactElement } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import './download-pdf.scss';

interface IProps {
    document: ReactElement;
    fileName?: string;
}

export const DownloadPdf = ({ document, fileName }: IProps) => {
    return (
        <div className={'download-pdf'} title="Save PDF">
            <PDFDownloadLink
                document={document as any}
                fileName={`${fileName}.pdf`}
                aria-label="Save PDF"
            ></PDFDownloadLink>
        </div>
    );
};
