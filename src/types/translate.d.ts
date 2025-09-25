declare module "@vitalets/google-translate-api" {
    export interface TranslateOptions {
        from?: string;
        to?: string;
        raw?: boolean;
    }

    export interface TranslateResult {
        text: string;
        from: {
            language: {
                iso: string;
            };
            text: {
                autoCorrected: boolean;
                value: string;
                didYouMean: boolean;
            };
        };
    }

    export default function translate(
        text: string,
        options?: TranslateOptions
    ): Promise<TranslateResult>;
}
