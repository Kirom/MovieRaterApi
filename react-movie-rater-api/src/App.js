import React, {Component} from 'react';
import './App.css';
import MovieList from "./components/movie-list";

class App extends Component {

    state = {
        movies: []
    }

    componentDidMount() {
        // fetching data
        fetch('http://localhost:8000/api/movies/',
            {
                method: 'GET',
                headers: {'Authorization': 'Token eeef93dced4eb16912a909325851f561af7d0b7b'}
            })
            .then(resp => resp.json())
            .then(res => this.setState({movies: res}))
            .catch(error => console.log(error))

    }

    render() {
        return (
            <div className="App">
                <h1>Movie Rater</h1>
                <MovieList movies={this.movies}/>
            </div>
        );
    }

}

export default App;
