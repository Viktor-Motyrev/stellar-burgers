import { FC, memo, useEffect } from 'react';

import styles from './modal.module.css';

import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { TModalUIProps } from './type';
import { ModalOverlayUI } from '@ui';

export const ModalUI: FC<TModalUIProps & { 'data-cy'?: string }> = memo(
  ({ title, onClose, children, ...props }) => {
    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        e.key === 'Escape' && onClose();
      };

      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    }, [onClose]);

    return (
      <>
        <div className={styles.modal} data-cy={props['data-cy'] || 'modal'}>
          <div className={styles.header}>
            <h3 className='text text_type_main-large'>{title}</h3>
            <button
              className={styles.button}
              type='button'
              data-cy='modal-close-button'
            >
              <CloseIcon type='primary' onClick={onClose} />
            </button>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
        <ModalOverlayUI onClick={onClose} />
      </>
    );
  }
);
