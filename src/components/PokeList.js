import React from 'react'
import PokeCard from './PokeCard'
import {CSSTransitionGroup} from 'react-transition-group'
import '../animations.scss'
import '../App.scss'

export default function PokeList(props) {   
    return (   
        <ul className="PokeGrid">
            {props.pokelist.map( (item,key) =>
                <CSSTransitionGroup
                    transitionName="poke_grid"
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={1000}
                    transitionAppear={true}
                    transitionAppearTimeout={1000}
                    key={key+'key'}
                >
                    <li key={key} onClick={ () => props.selectPoke(item)}>
                        <PokeCard profile={item} />
                    </li>
                </CSSTransitionGroup>
            )}
        </ul>
    )
}
