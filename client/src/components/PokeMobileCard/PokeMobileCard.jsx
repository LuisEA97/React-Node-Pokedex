import React, { useState } from 'react'
import s from './styles/PokeMobileCard.module.css'
import pokeball from '../../img/pokeball_lg.png'
import { pokemonTypeClass as typeClass } from '../pokemonTypeClass';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const PokeMobileCard = ({ pokemon }) => {
    const bgCard = typeClass(pokemon.types[0].en).cardBg;
    const bgLink = typeClass(pokemon.types[0].en).pageBg;
    const [loadedImg, setLoadedImg] = useState(false);
    const [errorLoadImg, setErrorLoadImg] = useState(false);
    const loaded = () => {
        setLoadedImg(true);
    };
    const lang = useSelector((store) => store.lang);
    return (
        <div className={`${s.card} shadow-medium ${bgCard}`}>
            <div className={s.attack}>
                <span>{pokemon.attack}</span>
            </div>
            <div className={s.imageContainer}>
                <img
                    src={pokeball}
                    alt="loading"
                    className={`${s.loadingImg} ${s.loaderImg} spinning ${!loadedImg || errorLoadImg ? "" : "hidden"
                        }`}
                />
                <img
                    draggable="false"
                    onLoad={loaded}
                    onError={(e) => {
                        if (e.target.src !== pokeball) {
                            setErrorLoadImg(true);
                        }
                    }}
                    src={pokemon.img}
                    alt={`${pokemon.name}_pic`}
                    className={`${errorLoadImg || !loadedImg ? "hidden" : ""}`}
                />
            </div>
            <div className={s.pokemonNameInfo}>
                <h2 className={`${s.name} consola`}>{pokemon.name}</h2>
                <div className={s.pillsHolder}>
                    {pokemon.types.map((type) => (
                        <div key={type.en} className={`${s.pill} shadow-small ${typeClass(type.en).pill}`}>
                            <span>{lang === "es" ? type.es : type.en}</span>
                        </div>
                    ))}
                </div>
                <div className={`${s.linkHolder}`}>
                    <Link to={`home/details/${pokemon.id}`}>
                        <button className={`${s.detailsBtn} ${bgLink}`}>
                            <span className={`${s.detailsBtnText}`}>
                                {lang === "es" ? "Detalles" : "Details"}
                            </span>
                            <BsArrowRight className={`${s.detailsBtnText}`} style={{ marginLeft: '5px' }} />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PokeMobileCard
