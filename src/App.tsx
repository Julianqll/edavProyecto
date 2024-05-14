import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from "./pages/HomePage";
import { PruebaWASMPage } from "./pages/PruebaWASMPage";

function App() {
  return (
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/menu" element={<PruebaWASMPage/>}/>
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  )
}

export default App