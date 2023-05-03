import React, { Component } from "react";

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
        return <div class="overflow-auto bg-image-all bg-cover bg-no-repeat bg-center bg-fixed flex h-screen justify-center items-center ">
            <div class="container h-full w-2/4 p-10">
                <div class="block rounded-lg bg-gray-800 shadow-lg dark:bg-neutral-800">
                    <div class="p-4">
                        <div class="md:m-6 md:p-12">
                            <div class="text-center">
                                {this.state.data.map((game) => (
                                    <div class="max-w-sm rounded overflow-hidden shadow-lg">
                                        <img class="w-full" src="akihabara.jpg" alt="Sunset in the mountains" />
                                        <div class="px-6 py-4">
                                            <div class="text-white font-bold text-xl mb-2" key={game.id} />
                                            <p class="text-white" game={game} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    }
}

export default Games;  
