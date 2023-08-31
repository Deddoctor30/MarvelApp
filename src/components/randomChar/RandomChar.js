import React, { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import Error from '../onError/Error';
import MarvelService from '../../services/MarvelService';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    const [char, setChar] = useState('');
    const {loading, error, getCharacter, clearError} = MarvelService();
    const onCharLoaded = (char) => {
        setChar(char);
    }

    useEffect(() => {
        updateChar()
    }, []);

    const updateChar = () => {
        clearError();                               // очистка ошибки (после ошибки, если кликать заново, то она не перезапишится, а это фикс) из http.hooks
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
    }

    const ifError = error ? <Error/> : null;
    const ifLoad = loading ? <Spinner/> : null;
    const ifContent = !(error || loading) ? <View char={char}/> : null;

    return (
        <div className="randomchar">
            {ifError}
            {ifLoad}
            {ifContent}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button 
                onClick={updateChar}
                    className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
 }

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    const noImg = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" style={thumbnail === noImg ? {objectFit: 'contain'} : null} className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description ? description.slice(0, 180) : 'Тут пока что ничего нет :('}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} target="_blank" className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} target="_blank" className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;