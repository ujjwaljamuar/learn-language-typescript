import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header.tsx";
import Loader from "./components/Loader.tsx";

function App() {
    const Home = lazy(() => import("./components/Home.tsx"));
    const Learning = lazy(() => import("./components/Learning.tsx"));
    const Login = lazy(() => import("./components/Login.tsx"));
    const Quiz = lazy(() => import("./components/Quiz.tsx"));
    const Result = lazy(() => import("./components/Result.tsx"));

    return (
        <BrowserRouter>
            <Header />
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/learn" element={<Learning />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/result" element={<Result />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
