import React, {Component} from 'react';
import './App.css';
import MovieList from "./components/movie-list";
import MovieDetails from "./components/movie-details";
import MovieForm from "./components/movie-form";

const FontAwesome = require('react-fontawesome')


class App extends Component {

    state = {
        movies: [],
        selectedMovie: null,
        editedMovie: null
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
        this.setState({editedMovie: null, selectedMovie: movie})
    }

    movieDeleted = selMovie => {
        const movies = this.state.movies.filter(movie => movie.id !== selMovie.id)
        this.setState({movies: movies, selectedMovie: null})
    }

    editClicked = selMovie => {
        this.setState({editedMovie: selMovie})
    }

    newMovie = () => {
        this.setState({editedMovie: {title: '', description: ''}})
    }

    cancelForm = () => {
        this.setState({editedMovie: null})
    }

    addMovie = movie => {
        this.setState({movies: [...this.state.movies, movie]})
    }

    render() {
        return (
            <div className="App">
                <h1><FontAwesome name='film'/> <span>Movie Rater</span></h1>
                <div className='layout'>
                    <MovieList movies={this.state.movies} movieClicked={this.loadMovie}
                               movieDeleted={this.movieDeleted} editClicked={this.editClicked}
                               newMovie={this.newMovie}/>
                    <div>
                        {!this.state.editedMovie ?
                            <MovieDetails movie={this.state.selectedMovie} updateMovie={this.loadMovie}/>
                            : <MovieForm movie={this.state.editedMovie} cancelForm={this.cancelForm}
                                         addMovie={this.addMovie} editedMovie={this.loadMovie}/>}
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
