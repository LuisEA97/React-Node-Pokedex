import React, { useState } from 'react'
import s from './styles/pokeCard.module.css' 
import pokeball from '../../img/pokeball_lg.png'
import { pokemonTypeClass as typeClass } from '../pokemonTypeClass';
import { useSelector} from 'react-redux';

const PokeCard = ({pokemon}) => {
    const bgCard = typeClass(pokemon.types[0].en).cardBg
    const [loadedImg, setLoadedImg] = useState(false) 
    const loaded = () => {
        setLoadedImg(true)
    }
    const lang = useSelector(store => store.lang);
    return (
        <div className={`${s.card} ${s.grow} shadow-medium ${bgCard}`}>
            <div className={s.attack}>
                <span>{pokemon.attack}</span>
            </div>
            <div className={s.imageContainer}>
                <img src={pokeball} alt="loading" className={`${s.loadingImg} ${s.loaderImg} spinning ${loadedImg? 'hidden' : ''}`} />
                <img draggable="false" onLoad={loaded} src={pokemon.img} alt={`${pokemon.name}_pic`} />
            </div>
            <h2 className={`${s.name} consola`}>{pokemon.name}</h2>
            <div className={s.pillsHolder}>
                {
                    pokemon.types.map(type => (
                        <div className={`${s.pill} shadow-small ${typeClass(type.en).pill}`}>
                            <span>{lang=== 'es'?(type.es):(type.en)}</span>
                        </div>
                    ))
                }
            </div>
            <div className={`${s.linkHolder}`}>
                <button className={`${s.detailsBtn}`}>
                    <div className={`${s.aux}`}>
                    <span className={`${s.detailsBtnText}`}>{lang=== 'es'?('Detalles...'):('Details...')}</span>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default PokeCard