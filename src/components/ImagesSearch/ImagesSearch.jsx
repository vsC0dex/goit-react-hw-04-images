import { useState, useEffect, useCallback } from 'react';
import { searchImages } from 'shared/services/imagesApi';
import { Triangle } from 'react-loader-spinner';

import Modal from 'shared/components/Modal';

import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import LargeImage from 'components/LargeImage/LargeImage';

import styles from './images-search.module.css';

const ImagesSearch = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState(null);

  // const { searchImages, loadMore, showImage, closeModal } = this;

  useEffect(() => {
    if (search) {
      const fetchImages = async () => {
        try {
          setLoading(true);
          const { hits } = await searchImages(search, page);
          setItems(prevItems => [...prevItems, ...hits]);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchImages();
    }
  }, [search, page, setLoading, setItems, setError]);

  const onSearchImages = useCallback(({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  }, []);

  const showImage = useCallback(hits => {
    setLargeImage(hits);
    setShowModal(true);
  }, []);

  const loadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setLargeImage(null);
  }, []);

  return (
    <>
      <div className={styles.App}>
        <header className={styles.Searchbar}>
          <Searchbar onSubmit={onSearchImages} />
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
        {showModal && (
          <Modal close={closeModal}>
            <LargeImage {...largeImage} />
          </Modal>
        )}
      </div>
    </>
  );
};

export default ImagesSearch;
