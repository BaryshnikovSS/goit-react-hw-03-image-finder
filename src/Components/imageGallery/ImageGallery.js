import React from "react";
import ImageGalleryItem from "./imageGelleryItem/ImageGalleryItem";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ gallery }) =>  (
    <ul className={css.ImageGallery}>
      {gallery.map(elem => (
        <ImageGalleryItem key={elem.id} id={elem.id} galleryItem={elem.smallImage} />
      ))}
    </ul>
  );

export default ImageGallery;
