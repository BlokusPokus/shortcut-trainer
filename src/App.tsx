import LandingPage from './components/layout/LandingPage';
import './components/styles/themes.css';
import './components/styles/LandingPage.css';
import PalletProvider from './PalletContext';

// import GridTesting from './gridtesting';

// const App = () => {
//   return <GridTesting />;
// };

const App = () => {
  return (
    <PalletProvider>
      <LandingPage />
    </PalletProvider>
  );
};

export default App;
