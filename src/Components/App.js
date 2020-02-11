import React, { Component } from "react";
import Searchbar from "./searchbar/Searchbar";
import ImageGallery from "./imageGallery/ImageGallery";
import Button from "./button/Button";
import Loader from "react-loader-spinner";
import Modal from "./modal/Modal";
import ErrorNotification from "./errors/errorNotification/ErrorNotification";
import { fetchGallery } from "../services/gallery-api";
import css from "./App.module.css";

const loaderCss = { margin: "0 auto" };

class App extends Component {
  state = {
    gallery: [],
    isModalOpen: false,
    isLoading: true,
    currentImage: "",

    page: 1,
    error: null
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  transform = data =>
    data.map(elem => ({
      id: elem.id, //уникальный идентификатор
      smallImage: elem.webformatURL, //ссылка на маленькое изображение для списка карточек
      largeImage: elem.largeImageURL //ссылка на большое изображение для модального окна
    }));

  componentDidMount() {
    const { page } = this.state;
    this.handleFetchGallery(page, "all");
  }

  handleFetchGallery = async (page, query) => {
    try {
      const data = await fetchGallery(page, query);
      this.setState({ gallery: this.transform(data), isLoading: false });
    } catch (error) {
      this.setState({ error });
      console.log(error);
    }

    window.addEventListener("keydown", this.handleKeyPress);
  };

  handleClickButton = async () => {
    this.setState({ isLoading: true });

    const nextPage = this.state.page + 1;
    const data = await fetchGallery(nextPage);

    this.setState(prevState => {
      return {
        gallery: [...prevState.gallery, ...this.transform(data)],
        page: nextPage,
        isLoading: false
      };
    });

    // При нажатии на кнопку Load more должна догружаться следующая порция изображений и рендериться вместе
    // с предыдущими. После загрузки и рендера новой партии изображений страница должна плавно скролиться.
    // Для скрола используй следующий код.

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });

    // Кнопка должна рендерится только тогда, когда есть какие-то загруженные изобаржения.
    // Если массив изображений пуст, кнопка не рендерится.
  };

  handleClickBox = e => {
    const { gallery } = this.state;
    const fined = gallery.find(
      elem => parseInt(elem.id) === parseInt(e.target.id)
    );

    if (fined) {
      this.setState({ currentImage: fined.largeImage });
      this.openModal();
    }
  };

  handleKeyPress = e => {
    if (e.code !== "Escape") return;
    this.closeModal();
  };

  handleBackdropClick = e => e.target === e.currentTarget && this.closeModal();

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  render() {
    const { gallery, currentImage, error, isLoading, isModalOpen } = this.state;

    return (
      <div className={css.App} onClick={this.handleClickBox}>
        <Searchbar onSubmit={this.handleFetchGallery} />
        {error && <ErrorNotification text={error.message} />}
        {gallery.length > 0 && <ImageGallery gallery={gallery} />}
        {isLoading && (
          <Loader
            style={loaderCss}
            type="ThreeDots"
            color="#somecolor"
            height={80}
            width={80}
          />
        )}
        {gallery.length > 0 && (
          <Button onClickButton={this.handleClickButton} />
        )}
        {isModalOpen && (
          <Modal
            onClose={this.closeModal}
            onClick={this.handleBackdropClick}
            reference={currentImage}
          />
        )}
      </div>
    );
  }
}

export default App;
