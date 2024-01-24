import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices.ts";

export const store = configureStore({
    reducer: {
        root: rootReducer,
    },
});
