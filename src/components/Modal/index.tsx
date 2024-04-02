import { Text } from '@/components';
import { ActionButton } from '@/context';

type ActionRef = {
  showPrimaryModalRef: React.RefObject<HTMLButtonElement>;
  showSecondaryModalRef: React.RefObject<HTMLButtonElement>;
  closePrimaryModalRef: React.RefObject<HTMLButtonElement>;
  closeSecondaryModalRef: React.RefObject<HTMLButtonElement>;
};

type ModalProps = {
  header: JSX.Element | string | null;
  body: JSX.Element | string | null;
  actionButton?: ActionButton;
  size?: 'md' | 'lg' | 'xl';
};

type IModal = {
  secondaryModal: ModalProps;
  primaryModal: ModalProps;
  hideModal: () => void;
  actionRef: ActionRef;
};

export const Modal: React.FC<IModal> = ({
  secondaryModal: { size: sSize, body: sBody, header: sHeader, actionButton: sActionButton },
  primaryModal: { size: pSize, body: pBody, header: pHeader, actionButton: pActionButton },
  hideModal,
  actionRef: {
    showPrimaryModalRef,
    showSecondaryModalRef,
    closePrimaryModalRef,
    closeSecondaryModalRef,
  },
}) => (
  <>
    {/* <!-- Button to trigger primary modal --> */}
    <button
      ref={showPrimaryModalRef}
      type='button'
      className='d-none'
      data-bs-toggle='modal'
      data-bs-target='#primary-modal'
    />
    {/* <!-- Button to trigger secondary modal --> */}
    <button
      ref={showSecondaryModalRef}
      type='button'
      className='d-none'
      data-bs-toggle='modal'
      data-bs-target='#secondary-modal'
    />
    {/* <!-- Primary Modal --> */}
    <div id='primary-modal' data-bs-backdrop='static' className='modal fade'>
      <div className={`modal-dialog modal-${pSize} modal-dialog-centered modal-dialog-scrollable`}>
        <div className='modal-content'>
          <div className='modal-header position-relative'>
            {typeof pHeader === 'string' ? (
              <Text typography='titleMedium' className='text-center w-100 mb-0'>
                {pHeader}
              </Text>
            ) : (
              pHeader
            )}
            <button
              type='button'
              onClick={hideModal}
              data-bs-dismiss='modal'
              ref={closePrimaryModalRef}
              className='btn-close position-absolute shadow-none end-0 me-2'
            />
          </div>
          <div className='modal-body'>
            {typeof pBody === 'string' ? (
              <Text typography='labelLarge' className='mb-0'>
                {pBody}
              </Text>
            ) : (
              pBody
            )}
          </div>
          {pActionButton && (
            <div className='modal-footer justify-content-center'>
              <button
                type='button'
                className={`btn btn-${pActionButton.type ?? 'primary'} rounded-pill`}
                onClick={() => {
                  pActionButton.onClick();
                  hideModal();
                }}
              >
                <Text typography='labelLarge' className='px-4 mb-0'>
                  {pActionButton.label}
                </Text>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    {/* <!-- Secondary Modal --> */}
    <div id='secondary-modal' data-bs-backdrop='static' className='modal fade'>
      <div className={`modal-dialog modal-${sSize} modal-dialog-centered modal-dialog-scrollable`}>
        <div className='modal-content'>
          <div className='modal-header position-relative'>
            {typeof sHeader === 'string' ? (
              <Text typography='titleMedium' className='text-center w-100 mb-0'>
                {sHeader}
              </Text>
            ) : (
              sHeader
            )}
            <button
              type='button'
              onClick={hideModal}
              data-bs-dismiss='modal'
              ref={closeSecondaryModalRef}
              className='btn-close position-absolute shadow-none end-0 me-2'
            />
          </div>
          <div className='modal-body'>
            {typeof sBody === 'string' ? (
              <Text typography='labelLarge' className='mb-0'>
                {sBody}
              </Text>
            ) : (
              sBody
            )}
          </div>
          {sActionButton && (
            <div className='modal-footer justify-content-center'>
              <button
                type='button'
                className={`btn btn-${sActionButton.type ?? 'primary'} rounded-pill`}
                onClick={() => {
                  sActionButton.onClick();
                  hideModal();
                }}
              >
                <Text typography='labelLarge' className='px-4 mb-0'>
                  {sActionButton.label}
                </Text>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </>
);
