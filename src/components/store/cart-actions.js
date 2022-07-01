import uiActions from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
  return (disPatch) => {
    const fetchData = async () => {
      const response = await fetch('');
      if (!response.ok) throw new Error('Could not fetch data!');

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      disPatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity
        })
      );
    } catch (error) {
      disPatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Failed',
          message: 'Fetching cart data failed!',
        })
      );
    }
  };
};

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
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
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
