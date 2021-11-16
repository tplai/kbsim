import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
    toggleTheme,
    selectTheme
} from './themeProviderSlice.js';
import store from '../store/store';

store.dispatch(toggleTheme);

function ThemeProvider({ children }) {
    const theme = useSelector(selectTheme);
    // console.log(theme);

    return (
        <div>
            {children}
        </div>
    );
}

export default ThemeProvider;
