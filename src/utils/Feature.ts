import axios from "axios";
import _ from "lodash";
import { generate } from "random-words";

const generateMCQ = (meaning: { Text: string }[], id: number): string[] => {
    const correctAns = meaning[id].Text;

    const allMeaningExceptForCorrect = meaning.filter(
        (i) => i.Text !== correctAns
    );

    const incorrectOptions = _.sampleSize(allMeaningExceptForCorrect, 3).map(
        (i) => i.Text
    );

    const mcqOptions = _.shuffle([...incorrectOptions, correctAns]);

    return mcqOptions;
};

export const TranslateWords = async (
    param: languageType
): Promise<WordType[]> => {
    try {
        const words = generate(8).map((i) => ({
            Text: i,
        }));

        /* Return in this format
        [
            {
                Text: ""
            }
        ]
        */

        const response = await axios.post(
            "https://microsoft-translator-text.p.rapidapi.com/translate",
            words,
            {
                params: {
                    "to[0]": param,
                    "api-version": "3.0",
                    profanityAction: "NoAction",
                    textType: "plain",
                },
                headers: {
                    "content-type": "application/json",
                    "X-RapidAPI-Key":
                        "ebfefa6e71mshe07aa7a9c9603c6p18db00jsn72ac2f5f04fb",
                    "X-RapidAPI-Host":
                        "microsoft-translator-text.p.rapidapi.com",
                },
            }
        );

        const receivedData: FetchedDataType[] = response.data;

        const arr: WordType[] = receivedData.map((i, id) => {
            const options: string[] = generateMCQ(words, id);
            return {
                word: i.translations[0].text,
                meaning: words[id].Text,
                options: options,
            };
        });

        return arr;
        // console.log(words[0].Text);

        // console.log(receivedData[0].translations[0].text);

        // console.log(data[0].translations[0].text);
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
    }
};

export const countCorrectAnswer = (arr1: string[], arr2: string[]): number => {
    if (arr1.length !== arr2.length) {
        throw new Error("lenght does not match");
    }

    let correctAnswerCount: number = 0;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] === arr2[i]) {
            correctAnswerCount++;
        }
    }

    return correctAnswerCount;
};

export const fetchAudio = async (
    text: string,
    language: languageType
): Promise<string> => {
    const key = import.meta.env.VITE_TEXT_TO_SPEECH_API;
    const rapidKey = import.meta.env.VITE_RAPID_API;

    const encodedParams = new URLSearchParams({
        src: text,
        r: "0",
        c: "mp3",
        f: "8khz_8bit_mono",
        b64: "true",
    });

    if (language === "ja") encodedParams.set("hl", "ja-jp");
    else if (language === "es") encodedParams.set("hl", "es-es");
    else if (language === "fr") encodedParams.set("hl", "fr-fr");
    else encodedParams.set("hl", "hi-in");

    const { data }: { data: string } = await axios.post(
        "https://voicerss-text-to-speech.p.rapidapi.com/",
        encodedParams,
        {
            params: { key },
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "X-RapidAPI-Key": rapidKey,
                "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
            },
        }
    );

    return data;
};
