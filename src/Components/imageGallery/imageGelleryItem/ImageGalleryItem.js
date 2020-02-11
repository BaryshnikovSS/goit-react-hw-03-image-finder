import React from "react";
import css from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ galleryItem, id }) => (
  <li className={css.ImageGalleryItem}>
    <img id={id} src={galleryItem} alt="Gallery_image" className={css.ImageGalleryItem_image} />
  </li>
);

export default ImageGalleryItem;
