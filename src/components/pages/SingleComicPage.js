import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import Spinner from '../spinner/Spinner';
import Error from '../onError/Error';
import './singleComicPage.scss';
import MarvelService from '../../services/MarvelService';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {loading, error, getComics, clearError} = MarvelService();

    useEffect(() => {
        updateComic()
    }, [comicId]);

    const updateComic = () => {
        clearError();  
        getComics(comicId)
            .then(onComicLoaded)
    }
    
    const onComicLoaded = (comic) => {
        setComic(comic);
    }
    
    const ifError = error ? <Error/> : null;
    const ifLoad = loading ? <Spinner/> : null;
    const ifContent = !(error || loading || !comic) ? <View comic={comic}/> : null;

    return (
        <div className="comic__info">
            {ifError}
            {ifLoad}
            {ifContent}
        </div>
    )
}

const View = ({comic}) => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    const {title, description, thumbnail, price, pages, language} = comic;
    return (
        <>
        <Helmet>
            <meta
            name="description"
            content={`${title} comics book`}
            />
            <title>{title}</title>
        </Helmet>
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages} pages</p>
                <p className="single-comic__descr">{`Language: ${language}`}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <a onClick={() => goBack()} className="single-comic__back">Back to all</a>
        </div>
        </>
    )

}


export default SingleComicPage;