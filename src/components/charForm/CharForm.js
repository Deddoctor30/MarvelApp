import React, { useState } from 'react';

import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import MarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';
import './charForm.scss';

const CharForm = () => {
   const [char, setChar] = useState(null);
   const {getCharacterByName, clearError} = MarvelService();
   const updateComic = (values) => {
      clearError();  
      getCharacterByName(values)
          .then(onCharLoaded)
  }
   const onCharLoaded = (char) => {
      setChar(char);
  }
  const result = !char ? null : char.length > 0 
      ? 
         <div className="form__valid">
            { <p className="form__validate">Вот он! Посетить {char[0].name} страницу?</p> }
            <Link to={`/char/${char[0].name}`}><button type="submit" className='button button__secondary button__last'><div className='inner'>Перейти</div></button></Link>
         </div> 
      :
         <div className='form__error'>Персонаж не найден</div>

   return (
      <div>
         <Formik
            initialValues={{
               name: '',
            }}
            validationSchema={Yup.object({
               name: Yup.string()
                  .required('Обязательное поле')
            })}
            onSubmit=  {values => updateComic(values.name)}
            >
            <Form className='form'>
               <label htmlFor="name">Или найдите персонажа по имени:</label>
               <Field
                  id="name"
                  name="name"
                  type="text"
                  className="form__input"
                  placeholder="Введите имя персонажа"
                  />
                  <button type="submit" className='button button__main button__first'><div className='inner'>Найти</div></button>
                  {result}
               <FormikErrorMessage className="form__error" name='name' component='div'/>
            </Form>
         </Formik>
      </div>
   )
}

export default CharForm;