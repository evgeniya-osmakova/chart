import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';

const AddingForm = ({x, type, y, id, onAddBtnClick}) => {
  Form.propTypes = {
    y: PropTypes.number,
    text: PropTypes.string,
    x: PropTypes.number,
    id: PropTypes.number,
    onAddBtnClick: PropTypes.func,
  };

  const signInSchema = Yup.object().shape({
    x: Yup.date()
      .required('Field is required'),
    type: Yup.string()
      .required('Field is required'),
    y: Yup.number().positive('Field must be a positive number')
      .required('Field is required'),
  });

  const dateValue = (x) ? x : '';
  const textValue = (type) ? type : '';
  const priceValue = (y) ? y : '';
  const idValue = (id) ? id : '';

  const initialValues = {
    x: dateValue,
    type: textValue,
    y: priceValue,
    id: idValue,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={(values) => {
        onAddBtnClick(values);
      }}
      onChange={(values) => {
        onAddBtnClick(values);
      }}
    >
      {(formik) => {
        const {isValid} = formik;
        return (
          <Form className="form">
            <label className="form__id">
              <Field type="text" name="id" />
            </label>

            <label className="form__field">
              <Field className="input" type="date" name="x" />
              <ErrorMessage name="x" component="span" className="error"/>
            </label>

            <label className="form__field">
              <Field className="input" type="text" name="type" />
              <ErrorMessage name="type" component="span" className="error"/>
            </label>

            <label className="form__field">
              <Field className="input" type="number" name="y" />
              <ErrorMessage name="y" component="span" className="error"/>
            </label>

            <button className="form__btn" type="submit" disabled={!(isValid)}>Save</button>
          </Form>
        );
      }
    }
  </Formik>);
};

export default AddingForm;
