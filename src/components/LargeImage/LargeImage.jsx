import styles from './large-image.module.css';

const LargeImage = ({ largeImageURL, tags }) => {
  return (
    <div className={styles.Block}>
      <img src={largeImageURL} alt={tags} className={styles.Img} />
    </div>
  );
};

export default LargeImage;
