import React from 'react'
import { Link } from 'react-router-dom'

export default function PokeCard(props) {
    return (
        <div className="pokeCard">
            <h5 className="pokeCard-title">{props.profile.name}</h5>
            <img src={props.profile.imageUrl} width={'100px'} height={'130px'}/>
            <Link to={{
                pathname: "/pokemon/"+props.profile.id,
                state: {
                    pokemon: props.profile
                }
            }}
            >
                <button>Catch Pokemon!</button>
            </Link>
        </div>
    )
}
