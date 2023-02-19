import { useEffect, useCallback, memo } from 'react';
import { createPortal } from 'react-dom';

import stlyes from './modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ close, children }) => {
  const closeModal = useCallback(
    ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  }, [closeModal]);

  return createPortal(
    <div className={stlyes.Overlay} onClick={closeModal}>
      <div className={stlyes.Modal}>
        <span onClick={close} className={stlyes.Close}>
          X
        </span>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  close: PropTypes.func.isRequired,
};

export default memo(Modal);
/*
class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.close();
    }
  };

  render() {
    const { children, close } = this.props;
    const { closeModal } = this;
    return createPortal(
      <div className={stlyes.Overlay} onClick={closeModal}>
        <div className={stlyes.Modal}>
          <span onClick={close} className={stlyes.Close}>
            X
          </span>
          {children}
        </div>
      </div>,
      modalRoot
    );
  }
}
*/
