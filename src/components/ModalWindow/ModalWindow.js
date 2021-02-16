import React from 'react';
import PropTypes from 'prop-types';
import AddingForm from '../Form/Form.js';

const ModalWindow = ({ addData, setModalWindowIsShown }) => {
  ModalWindow.propTypes = {
    addData: PropTypes.func.isRequired,
    setModalWindowIsShown: PropTypes.func.isRequired,
  };

  const closeModalWindow = () => {
    setModalWindowIsShown(false);
  }

  const onAddBtnClick = (values) => {
    addData(values);
    closeModalWindow();
  }

  return (
    <div className="modal">
      <div onClick={closeModalWindow} className="modal-back"/>
      <div className="modal-window">
        <h2 className="modal__title">
          Add new data
        </h2>
        <AddingForm onAddBtnClick={onAddBtnClick} />
      </div>
    </div>
  );
};

export default ModalWindow;
