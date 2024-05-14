import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from "./pages/HomePage";
import { MenuPage } from "./pages/MenuPage";

function App() {
  return (
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/menu" element={<MenuPage/>}/>
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  )
}

export default App