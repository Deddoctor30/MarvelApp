import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { CSSTransition } from 'react-transition-group';
import AppBanner from '../appBanner/AppBanner';
import Spinner from '../spinner/Spinner';
import Error from '../onError/Error';
import './singleCharPage.scss';
import MarvelService from '../../services/MarvelService';

const SingleCharPage = () => {
    const {charNme} = useParams();                      // charId из App со значением id через спец. хук useParams()
    const [char, setChar] = useState(null);
    const {loading, error, getCharacterByName, clearError} = MarvelService();

    useEffect(() => {
        updateChar()
    }, [charNme]);

    const updateChar = () => {
        clearError();
        getCharacterByName(charNme)
            .then(onCharLoaded)
    }
    
    const onCharLoaded = (char) => {
        setChar(char);
    }

    const ifError = error ? <Error/> : null;
    const ifLoad = loading ? <Spinner/> : null;
    const ifContent = !(error || loading || !char) ? <View char={char}/> : null;

    return (
        <div className="comic__info">
            {ifError}
            {ifLoad}
            {ifContent}
        </div>
    )
}

const View = (char) => {
    return (
        <>
            <CSSTransition
                timeout={500}
                classNames="single-char__item"
                key={item.id}
            >
                <Helmet>
                    <meta
                    name="description"
                    content={`${char.char[0].name} character`}
                    />
                    <title>{char.char[0].name}</title>
                </Helmet>
                <AppBanner/>
                <div className="single-char">
                    <img src={char.char[0].thumbnail} alt="x-men" className="single-char__img"/>
                    <div className="single-char__info">
                        <h2 className="single-char__name">{char.char[0].name}</h2>
                        <p className="single-char__descr">{char.char[0].description}</p>
                    </div>
                </div>
            </CSSTransition>
        </>
    )
}


export default SingleCharPage;
