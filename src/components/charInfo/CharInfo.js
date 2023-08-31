import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import Error from '../onError/Error';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';
import './charInfo.scss';
import { Link } from 'react-router-dom';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = MarvelService();
    useEffect(() => {
        updateChar()
    }, [props.charId]);
    const updateChar = () => {
        if (!props.charId) {
            return
        }
        clearError();
        getCharacter(props.charId)
            .then(onCharLoaded)
    }
    const onCharLoaded = (char) => {
        setChar(char);
    }
    const skeleton = char || error || loading ? null : <Skeleton/>;
    const ifError = error ? <Error/> : null;
    const ifLoad = loading ? <Spinner/> : null;
    const ifContent = !(error || loading || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {ifError}
            {ifLoad}
            {ifContent}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics, comicsId} = char;
    const noImg = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

    return(
        <>
            <div className="char__basics">
            <img src={thumbnail} alt="Random character" style={thumbnail === noImg ? {objectFit: 'contain'} : null}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main" target="_blank">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary" target="_blank">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
            </div>
            <div className="char__descr">
                {description ? description.slice(0, 210) : 'Тут пока что ничего нет :('}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'Тут нет комиксов :('}
                {
                    comics.map((item, i) => {
                        return (
                            <Link to={`/comics/${item.resourceURI.slice(44)}`} className="char__comics-item" key={i}>
                                {item.name}
                            </Link>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;