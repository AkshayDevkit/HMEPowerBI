import { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { InternationalizationService } from './internationalization.service';

interface IProps {
    children: ReactNode;
}

export const Internationalization = ({ children, ...props }: IProps) => {
    const internationalizationService = new InternationalizationService();

    /*
    const [locale, setLocale] = useState(
        internationalizationService.getLocale(),
    );

    const [messages, setMessages] = useState(
        internationalizationService.getMessages(),
    );
    */

    return (
        <IntlProvider
            locale={internationalizationService.getLocale()}
            messages={internationalizationService.getMessages()}
        >
            <div></div>
            {children}
        </IntlProvider>
    );
};
