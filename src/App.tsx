import LandingPage from './components/layout/LandingPage';
import './components/styles/themes.css';
import './components/styles/LandingPage.css';
import PalletProvider from './PalletContext';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import ShortcutListPage from './components/shortcutPages/ShortcutListPage';

// import GridTesting from './gridtesting';

// const App = () => {
//   return <GridTesting />;
// };

const App = () => {
  return (
    <PalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shortcut-list" element={<ShortcutListPage />} />
        </Routes>
      </BrowserRouter>
    </PalletProvider>
  );
};

export default App;
