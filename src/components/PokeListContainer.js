import React, { Component } from 'react'
import PokeList from './PokeList'
import PokeCard from './PokeCard'
import '../App.scss'

const API = 'https://api.pokemontcg.io/v1';

export default class PokeListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          pokemons: [],
          selectedPokemons: [],
          page: 1,
          isLoading: false,
          isFetching: false,
          error: null,
        };
    }
    
    async componentDidMount() {
        await this.setState({ isLoading: true }); 
        await fetch(API + `/cards?page=${this.state.page}`)
            .then(response => {
                if (response.ok) { return response.json();} 
                else { throw new Error('Something went wrong ...');}
            })
            .then(data => {
                this.setState({ 
                    pokemons: data.cards, 
                    isLoading: false 
                })
            })
            .catch(error => this.setState({ error, isLoading: false }));  
    }

    loadMore = async() => {  
        await this.setState( prevState => ({page: (prevState.page+1), isFetching: true}))
        await fetch(API + `/cards?page=${this.state.page}` )
            .then(response => { 
                if (response.ok) { return response.json();} 
                else { throw new Error('Something went wrong ...');}
            })
            .then(data => {
                this.setState( prevState => ({  
                    pokemons: [ ...prevState.pokemons, ...data.cards ], 
                    isFetching: false 
                }))
            })
            .catch(error => this.setState({ error, isFetching: false }));        
    }
    
    render() {
        const {pokemons, isLoading, isFetching, error} = this.state;

        if (error) { return <p>{error.message}</p>;}
        if (isLoading) {return <p>Loading ...</p>;}
        if(!isLoading && !error){ return (
            <section style={{width:'100%', padding:'2rem 5rem' }}>
                <h2>Your poke team</h2>
                <PokeList pokelist={pokemons} />           
                <button onClick={this.loadMore}>Click me</button>
                {isFetching? <p>Discovering new pokemons...</p>: ''}
            </section>
        )}
    }
}
