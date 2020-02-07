import React, { Component } from 'react'
import PokeList from './PokeList'
import PokeCard from './PokeCard'
import {CSSTransitionGroup} from 'react-transition-group'
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
        // De-Attach the onScrollEvent
        window.addEventListener("scroll", this.handleScroll);
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

    componentWillUnmount(){
        // Attach the onScrollEvent
        window.removeEventListener("scroll", this.handleScroll);
    }

    loadMore = async() => {  
        // BounceFlag to prevent multiple request on final scroll
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

    handleScroll = async() => {
        try {
            // Get the position of the last rendered element so it knows when to trigger refresh 
            let lastLi = await document.querySelector("ul > :last-child li");
            let lastLiOffset = (lastLi.offsetTop-50);
            let pageOffset = (window.pageYOffset + window.innerHeight - lastLi.clientHeight);
      
            if( (lastLiOffset < pageOffset) && !this.state.isFetching) {
                await this.loadMore();
            }
          }
          catch(error) {
            console.error(error);
          }
    };

    _selectPokemon = ( poke ) => {
        this.setState( prevState => ({
            selectedPokemons: prevState.selectedPokemons.concat(poke)
        }))
    }
    
    render() {
        const {pokemons, selectedPokemons, isLoading, isFetching, error} = this.state;

        if (error) { return <p>{error.message}</p>;}
        if (isLoading) {return <p>Loading ...</p>;}
        if(!isLoading && !error){ return (
            <section style={{width:'100%', padding:'2rem 5rem' }}>
                <h2>Your poke team</h2>
                <aside style={{backgroundColor: "yellow", marginBottom: "2rem", padding: "2rem"}} className={"PokeGrid"}>
                    {selectedPokemons.map( (item, key) => 
                        <CSSTransitionGroup
                        transitionName="poke_grid"
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={1000}
                        transitionAppear={true}
                        transitionAppearTimeout={1000}
                        key={key+'key'}
                        >
                            <PokeCard key={key} profile={item}/>
                        </CSSTransitionGroup>
                    )}
                </aside>
                <PokeList pokelist={pokemons} selectPoke={this._selectPokemon.bind(this)}/>           
                {isFetching? <p>Discovering new pokemons...</p>: ''}
            </section>
        )}
    }
}
