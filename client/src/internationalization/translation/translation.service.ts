import { EnTranslations } from './en/en-translations';
import { TranslationConfig } from './translation.config';

export class TranslationService {
    getMessages(locale: string) {
        let messages = {};
        switch (locale) {
            case 'en':
                messages = EnTranslations;
                break;
            default:
                messages = EnTranslations;
        }

        return messages;
    }

    addMessages(module: any, messages: any[]) {}

    module(alias: string): any {
        return TranslationConfig.alias[alias];
    }
}
