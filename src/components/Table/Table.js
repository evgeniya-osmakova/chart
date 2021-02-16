import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import ModalWindow from '../ModalWindow/ModalWindow.js';
import AddingForm from '../Form/Form.js';

const Table = ({ data, setData }) => {
  Table.propTypes = {
    data: PropTypes.array.isRequired,
    setData: PropTypes.func.isRequired,
  };

  const [modalWindowIsShown, setModalWindowIsShown] = useState(false);

  const addData = (values) => {
    const id = uuidv4();
    setData([...data, {...values, id}]);
  }

  const updateData = (values) => {
    const oldData = data.filter(({id: oldId}) => oldId !== values.id)
    setData([...oldData, values]);
  }

  return (
    <section className="table">
      {(modalWindowIsShown) ? <ModalWindow addData={addData} setModalWindowIsShown={setModalWindowIsShown}/> : ''}
      <div className="headers">
        <h2 className="headers__item">Date</h2>
        <h2 className="headers__item">Company</h2>
        <h2 className="headers__item">Price</h2>
      </div>
      <div className="table-data">
        {data.map(({x, type, y, id}) => {
          return (<AddingForm key={id} x={x} type={type} y={y} id={id} onAddBtnClick={updateData}/>)
        })}
      </div>
      <button className="table__btn" onClick={() => setModalWindowIsShown(true)}>Add new data</button>
    </section>
  );
};

export default Table;
