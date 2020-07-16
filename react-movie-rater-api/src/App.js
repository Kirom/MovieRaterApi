import React, {Component} from 'react';
import './App.css';
import MovieList from "./components/movie-list";
import MovieDetails from "./components/movie-details";

class App extends Component {

    state = {
        movies: [],
        selectedMovie: null
    }

    componentDidMount() {
        // fetching data
        fetch(`http://localhost:8000/api/movies/`,
            {
                method: 'GET',
                headers: {'Authorization': 'Token 88aa3b76a55365cdfb5670c1a2667e719cd6d1f7'}
            })
            .then(resp => resp.json())
            .then(res => this.setState({movies: res}))
            .catch(error => console.log(error))

    }

    loadMovie = movie => {
        this.setState({selectedMovie: movie})
    }

    render() {
        return (
            <div className="App">
                <h1>Movie Rater</h1>
                <div className='layout'>
                    <MovieList movies={this.state.movies} movieClicked={this.loadMovie}/>
                    <MovieDetails movie={this.state.selectedMovie} updateMovie={this.loadMovie}/>
                </div>
            </div>
        );
    }

}

export default App;
