import React, { Component } from 'react'
import Header from '../components/Header'
import {CSSTransitionGroup} from 'react-transition-group';

import '../App.scss';
import '../animations.scss';

const API = 'https://api.pokemontcg.io/v1';

export default class PokemonProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: '',
            isLoading: false,
            error: null,
        };
    }

    loadData = async(QUERY) => {
        await this.setState({ isLoading: true})
        await fetch(API + '/cards/' + QUERY )
            .then(response => { 
                if (response.ok) { return response.json();} 
                else { throw new Error('Something went wrong ...');}
            })
            .then(data => {
                this.setState({  
                    pokemon: data.card, 
                    isLoading: false 
                })
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    componentDidMount(){
        // Checks if the page has been accesed via link or directly by url
        this.props.location.state?.pokemon ? this.setState({pokemon: this.props.location.state.pokemon}) : this.loadData(this.props.match.params.id)
    }

    render() {
        const { isLoading, error, pokemon} = this.state;

        if (error) { return <p>{error.message}</p>;}
        if (isLoading) { return <p>Loading ...</p>;}
        if(!isLoading && !error){ return (
            <>
                <Header/> 
                <main className="container">
                    <CSSTransitionGroup
                            transitionName="poke_grid"
                            transitionEnterTimeout={1000}
                            transitionLeaveTimeout={1000}
                            transitionAppear={true}
                            transitionAppearTimeout={1000}   
                    >
                        <section style={{display: "flex", flexDirection: "column", placeItems: "center", padding: "2rem"}}>
                            <h2>{pokemon.name}</h2>
                            <img src={pokemon.imageUrl}/>
                            <p>{pokemon.text}</p> 
                        </section>
                    </CSSTransitionGroup>
                </main>
            </>
        )}
    }
}
