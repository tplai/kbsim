import React from 'react';
import Header from './../header/Header';
import KeySimulator from './../keySimulator/KeySimulator';
import Footer from './../footer/Footer';
import ThemeProvider from './../themeProvider/ThemeProvider';

const Main = () => (
  <ThemeProvider>
    <Header/>
    <KeySimulator/>
    <Footer/>
  </ThemeProvider>
)

export default Main;
