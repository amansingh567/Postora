import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lightTheme, darkTheme } from '../../store/themeSlice';

function ThemeBtn() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.themeMode);

  useEffect(() => {
    document.querySelector('html').classList.remove('light', 'dark');
    document.querySelector('html').classList.add(theme);
  }, [theme]);

  const themeHandler = () => {
    if (theme === 'light') {
      dispatch(darkTheme());
    } else {
      dispatch(lightTheme());
    }
  };

  return (
    <button
      className="px-4 py-2 text-white bg-gray-700 hover:bg-gray-800 rounded-lg transition duration-200"
      onClick={themeHandler}
    >
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
}

export default ThemeBtn;