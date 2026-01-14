import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoute from "./routes/AuthRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<AuthRoute />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;