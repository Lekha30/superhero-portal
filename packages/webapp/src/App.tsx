import './App.css';
import { client } from './graphql/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { Provider } from 'urql';
import { BrowserRouter as Router } from 'react-router-dom';
import { Main } from './pages/Main';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});

function App() {
  const graphqlClient = client();
   
  return (
    <Provider value={graphqlClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <Main />
        </Router>
      </ThemeProvider>
      </Provider>
  );
}

export default App;
