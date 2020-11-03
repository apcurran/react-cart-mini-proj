function reducer(state, action) {
    switch (action.type) {
        case "CLEAR_CART":
            return {
                ...state,
                cart: []
            };
        case "REMOVE_ITEM":
            const updatedCart = state.cart.filter(item => {
                return item.id !== action.payload;
            });

            return {
                ...state,
                cart: updatedCart
            };
        case "INCREASE_ITEM_QTY":
            let incTempCart = state.cart.map(item => {
                if (item.id === action.payload) {
                    return {
                        ...item,
                        amount: item.amount + 1
                    };
                } else {
                    return item;
                }
            });

            return {
                ...state,
                cart: incTempCart
            };
        case "DECREASE_ITEM_QTY":
            let decTempCart = state.cart
                .map(item => {
                    if (item.id === action.payload) {
                        return {
                            ...item,
                            amount: item.amount - 1
                        };
                    } else {
                        return item;
                    }
                })
                .filter(item => item.amount !== 0);

            return {
                ...state,
                cart: decTempCart
            };
        case "GET_TOTAL":
            let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
                const { price, amount } = cartItem;
                const itemTotal = price * amount;

                cartTotal.amount += amount;
                cartTotal.total += itemTotal;

                return cartTotal;
            }, { total: 0, amount: 0 });

            total = Number(total.toFixed(2));

            return {
                ...state,
                total,
                amount
            };
        case "LOADING":
            return {
                ...state,
                loading: true
            };
        case "DISPLAY_ITEMS":
            return {
                ...state,
                cart: action.payload,
                loading: false
            };
        default:
            throw new Error("No matching action type.");
    }
}

export default reducer;