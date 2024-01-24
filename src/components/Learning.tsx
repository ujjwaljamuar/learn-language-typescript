import { ArrowBack, VolumeUp } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TranslateWords, fetchAudio } from "../utils/Feature.ts";
import { useDispatch, useSelector } from "react-redux";
import {
    clearState,
    getWordsFailure,
    getWordsRequest,
    getWordsSuccess,
} from "../redux/slices.ts";
import Loader from "./Loader.tsx";

const Learning = () => {
    const [count, setCount] = useState<number>(0);
    const [audioSrc, setAudioSrc] = useState<string>("");
    const audioRef = useRef(null);
    const params = useSearchParams()[0].get("language") as languageType;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, words, error } = useSelector(
        (state: { root: StateType }) => state.root
    );

    const audioHandler = async () => {
        const player: HTMLAudioElement = audioRef.current!;

        if (player) {
            player.play();
        } else {
            const data = await fetchAudio(words[count]?.word, params);
            setAudioSrc(data);
        }
    };

    const nextHandler = (): void => {
        setCount((prev) => prev + 1);
        setAudioSrc("");
    };

    useEffect(() => {
        dispatch(getWordsRequest());

        TranslateWords(params || "hi")
            .then((arr: WordType[]) => dispatch(getWordsSuccess(arr)))
            .catch((err) => dispatch(getWordsFailure(err)));

        if (error) {
            alert(error);
            dispatch(clearState());
        }
    }, []);

    if (loading) {
        return <Loader />;
    }
    return (
        <Container maxWidth="sm" sx={{ padding: "1rem" }}>
            {audioSrc && <audio src={audioSrc} autoPlay ref={audioRef}></audio>}
            <Button
                onClick={
                    count === 0
                        ? () => navigate("/")
                        : () => setCount((prev) => prev - 1)
                }
            >
                <ArrowBack />
            </Button>

            <Typography margin={"2rem 0"}>Learning made easy</Typography>

            <Stack direction={"row"} spacing={"1rem"}>
                <Typography variant="h4">
                    {count + 1} - {words[count]?.word}
                </Typography>

                <Typography variant="h4" color={"blue"}>
                    : {words[count]?.meaning}
                </Typography>

                <Button sx={{ borderRadius: "50%" }} onClick={audioHandler}>
                    <VolumeUp />
                </Button>
            </Stack>

            <Button
                variant="contained"
                fullWidth
                sx={{ margin: "3rem 0" }}
                onClick={
                    count === 7
                        ? () => navigate("/quiz")
                        : () => {
                              nextHandler();
                          }
                }
            >
                {count === 7 ? "QUIZ" : "Next"}
            </Button>
        </Container>
    );
};

export default Learning;
