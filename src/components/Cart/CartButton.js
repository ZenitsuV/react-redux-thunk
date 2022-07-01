import React from 'react';
import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/ui-slice';

const CartButton = (props) => {
  const disPatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const cartToggleHandler = () => {
    disPatch(uiActions.toggle());
  };

  return (
    <button className={classes.button} onClick={cartToggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
