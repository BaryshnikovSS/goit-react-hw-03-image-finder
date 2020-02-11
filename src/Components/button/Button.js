import React from "react";
import css from './Button.module.css'

const Button = ({ onClickButton }) => (
  <button className={css.button} onClick={onClickButton}>
    Load more
  </button>
);

export default Button;
