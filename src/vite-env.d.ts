/// <reference types="vite/client" />

type languageType = "fr" | "hi" | "ja" | "es";

type WordType = {
    word: string;
    meaning: string;
    options: string[];
};

interface StateType {
    loading: boolean;
    result: string[];
    words: WordType[];
    error?: string;
}

type FetchedDataType = {
    translations: {
        text: string;
    }[];
};


