import styles from './image-gallery.module.css';
import PropTypes from 'prop-types';

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
  return items.length ? <ul className={styles.ImageGallery}>{image}</ul> : null;
};

export default ImageGallery;

ImageGallery.defaultProps = {
  items: [],
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(),
};
