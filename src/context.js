import React, { useState, useContext, useReducer, useEffect } from 'react';
import cartItems from './data';
import reducer from './reducer';

const url = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = React.createContext();

const initState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0
};

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  function clearCart() {
    dispatch({ type: "CLEAR_CART" });
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(AppContext);
}

export { AppContext, AppProvider };
