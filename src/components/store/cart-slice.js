import { createSlice } from '@reduxjs/toolkit';
import uiActions from './ui-slice';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity = existingItem.quantity + 1;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    clearCart() {},
  },
});

export const sendCartData = (cart) => {
  return async (disPatch) => {
    disPatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        messahe: 'sending cart data',
      })
    );

    const sendRequest = async () => {
      const responce = await fetch(
        'https://react-http-f69ce-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );

      if (!responce.ok) throw new Error('Something went wrong');
    };
    try {
      await sendRequest();
      disPatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success',
          message: 'Cart data sent successfully!',
        })
      );
    } catch (error) {
      disPatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Failed',
          message: 'Failed to sent',
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
