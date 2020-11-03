import React, { useState, useContext, useReducer, useEffect } from 'react';
import cartItems from './data';
import reducer from './reducer';

const API_URL = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = React.createContext();

const initState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0
};

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
  }, [state.cart]);

  function clearCart() {
    dispatch({ type: "CLEAR_CART" });
  }

  function removeItem(id) {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }

  function increaseItemQty(id) {
    dispatch({ type: "INCREASE_ITEM_QTY", payload: id });
  }

  function decreaseItemQty(id) {
    dispatch({ type: "DECREASE_ITEM_QTY", payload: id });
  }

  // API
  async function getData() {
    dispatch({ type: "LOADING" });

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      dispatch({ type: "DISPLAY_ITEMS", payload: data });
      
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseItemQty,
        decreaseItemQty,
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
