import { TranslationService } from './translation/translation.service';

export class InternationalizationService {
    /* TODO NS: Need to inject configuration service object
    to load client configuration details */
    // constructor() {}

    getLocale() {
        /* clientConfiguration.locale */
        // locales - en,ru,in
        return 'en'; 
    }

    getMessages() {
        const locale = this.getLocale();
        return new TranslationService().getMessages(locale);
    }
}
