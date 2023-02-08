import { Component } from 'react';
// import axios from 'axios';
import { searchImages } from 'shared/services/imagesApi';
import { Triangle } from 'react-loader-spinner';

import Modal from 'shared/components/Modal';

import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import LargeImage from 'components/LargeImage/LargeImage';
// import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import styles from './images-search.module.css';

class ImagesSearch extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    largeImage: null,
  };

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;

    if (prevState.search !== search || prevState.page !== page) {
      // this.setState({ loading: true });
      // searchImages(search, page)
      //   .then(({ hits }) => {
      //     this.setState(({ items }) => ({ items: [...items, ...hits] }));
      //   })
      //   .catch(error => {
      //     this.setState({ error: error.message });
      //   })
      //   .finally(() => this.setState({ loading: false }));
      this.fetchImages();
    }
  }

  async fetchImages() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const { hits } = await searchImages(search, page);
      this.setState(({ items }) => ({ items: [...items, ...hits] }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  searchImages = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showImage = ({ tags, largeImageURL }) => {
    this.setState({
      largeImage: {
        tags,
        largeImageURL,
      },
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImage: null,
    });
  };

  // componentDidMount() {
  //   this.setState({ loading: true });
  //   axios
  //     .get('https://pixabay.com/api/?key=30765883-517ae795d1e2950758ca42c2f')
  //     .then(({ data: { hits } }) => {
  //       this.setState({ items: hits });
  //     })
  //     .catch(error => {
  //       this.setState({ error: error.message });
  //     })
  //     .finally(() => this.setState({ loading: false }));
  // }

  render() {
    const { items, loading, error, showModal, largeImage } = this.state;
    const { searchImages, loadMore, showImage, closeModal } = this;
    // const image = items.map(({ id, webformatURL, tags }) => (
    //   <li key={id} className={styles.ImageGalleryItem}>
    //     <img
    //       className={styles.ImageGalleryItem_image}
    //       src={webformatURL}
    //       alt={tags}
    //     />
    //   </li>
    // ));

    return (
      <>
        <div className={styles.App}>
          <header className={styles.Searchbar}>
            <Searchbar onSubmit={searchImages} />
            {/* <header className={styles.Searchbar}>
            <form className={styles.SearchForm}>
              <button type="submit" className={styles.SearchForm_button}>
                Search
                <span className={styles.SearchForm_button_label}></span>
              </button>

              <input
                className={styles.SearchForm_input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
              />
            </form>
          </header> */}
          </header>

          <ImageGallery items={items} showImage={showImage} />
          {loading && (
            <Triangle
              height="180"
              width="180"
              color="#4fa94d"
              ariaLabel="triangle-loading"
              visible={true}
            />
          )}
          {error && <p>{error}</p>}
          {Boolean(items.length) && !loading && (
            <button className={styles.Button} onClick={loadMore}>
              Load More
            </button>
          )}
          {/* <ImageGalleryItem items={items} /> */}

          {/* <ul className={styles.ImageGallery}>{image}</ul> */}
          {showModal && (
            <Modal close={closeModal}>
              <LargeImage {...largeImage} />
            </Modal>
          )}
        </div>
      </>
    );
  }
}

export default ImagesSearch;
