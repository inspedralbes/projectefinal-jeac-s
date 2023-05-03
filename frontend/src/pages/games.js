import React, { Component } from "react";
import GameCard from '../components/gameCard.js';
import routes from "../index.js";

class Games extends Component {
    constructor() {
        super();
        this.setError = (null);
        this.state = { data: [] };
    }

    async componentDidMount() {
        try {
            const response = await fetch(routes.fetchLaravel + '/api/gamesList', {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            this.setState({ data: data.games });
            console.log(data);
        } catch (error) {
            //this.setError(error);

        }
    }


    render() {
        return <div className="cartasGrid">
            {this.state.data.map((game) => (
                <GameCard key={game.id} game={game} />
            ))}
            </div>
    }
}

export default Games;  
