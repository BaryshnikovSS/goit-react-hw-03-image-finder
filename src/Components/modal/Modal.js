import React from "react";
import css from "./Modal.module.css";

// При клике по элементу галереи должно открываться модальное окно с темным оверлеем и отображаться большая
// версия изображения. Модальное окно должно закрываться по нажатию клавиши ESC или по клику на оверлее.

const Modal = ({ reference, onClick }) => (
  <div className={css.Overlay} onClick={onClick}>
    <div className={css.Modal}>
      <img className={css.img} src={reference} alt="" />
    </div>
  </div>
);

export default Modal;
