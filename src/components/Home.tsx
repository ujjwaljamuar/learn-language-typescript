import { Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const languages = [
    {
        name: "French",
        code: "fr",
    },
    {
        name: "Hindi",
        code: "hi",
    },
    {
        name: "Japanese",
        code: "ja",
    },
    {
        name: "Spanish",
        code: "es",
    },
];

const Home = () => {
    const navigate = useNavigate();
    const languageSelectHandler = (language: string): void => {
        navigate(`/learn?language=${language}`);
    };
    return (
        <Container maxWidth="sm">
            <Typography variant="h3" padding={"2rem"} textAlign={"center"}>
                Welcome, Begin your journey of learning.
            </Typography>

            <Stack
                direction={"row"}
                spacing={"2rem"}
                padding={"2rem"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                {languages.map((i) => (
                    <Button
                        key={i.code}
                        variant="contained"
                        onClick={() => languageSelectHandler(i.code)}
                    >
                        {i.name}
                    </Button>
                ))}
            </Stack>

            <Typography textAlign={"center"}>Choose one language</Typography>
        </Container>
    );
};

export default Home;
