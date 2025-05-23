import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import AppRoutes from './routes';

// Styles
import './styles/global.css';

const App = () => {
  return (
    <ConfigProvider locale={viVN}>
      <ThemeProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default App;
