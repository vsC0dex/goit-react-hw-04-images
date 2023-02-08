import { Component } from 'react';
import { createPortal } from 'react-dom';

import stlyes from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

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

export default Modal;
