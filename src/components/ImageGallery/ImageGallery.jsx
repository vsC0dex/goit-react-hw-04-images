import styles from './image-gallery.module.css';
import PropTypes from 'prop-types';
import { memo } from 'react';

const ImageGallery = ({ items, showImage }) => {
  const image = items.map(({ id, webformatURL, tags, largeImageURL }) => (
    <li
      onClick={() => showImage({ tags, largeImageURL })}
      key={id}
      className={styles.ImageGalleryItem}
    >
      <img
        className={styles.ImageGalleryItem_image}
        src={webformatURL}
        alt={tags}
      />
    </li>
  ));
  console.log('rendering');
  return items.length ? <ul className={styles.ImageGallery}>{image}</ul> : null;
};

export default memo(ImageGallery);

ImageGallery.defaultProps = {
  items: [],
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  showImage: PropTypes.func.isRequired,
};
