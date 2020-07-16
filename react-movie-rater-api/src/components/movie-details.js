import React, {Component} from 'react';

const FontAwesome = require('react-fontawesome')

class MovieDetails extends Component {

    state = {
        highlighted: -1
    }

    highlightRate = high => evt => {
        this.setState({highlighted: high})
    }

    rateClicked = stars => evt => {
        fetch(`http://localhost:8000/api/movies/${this.props.movie.id}/rate_movie/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token 88aa3b76a55365cdfb5670c1a2667e719cd6d1f7'
                },
                body: JSON.stringify({stars: stars + 1})
            })
            .then(resp => resp.json())
            .then(res => this.getDetails())
            .catch(error => console.log(error))

    }

    getDetails = () => {
        fetch(`http://localhost:8000/api/movies/${this.props.movie.id}/`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token 88aa3b76a55365cdfb5670c1a2667e719cd6d1f7'
                }
            }).then(resp => resp.json())
            .then(res => this.props.updateMovie(res))
            .catch(error => console.log(error))
    }


    render() {
        const movie = this.props.movie
        return (
            <React.Fragment>
                {movie ? (
                    <div>
                        <h3>{movie.title}</h3>
                        <FontAwesome name={'star'} className={movie.avg_rating > 0 ? 'orange' : ''}/>
                        <FontAwesome name={'star'} className={movie.avg_rating > 1 ? 'orange' : ''}/>
                        <FontAwesome name={'star'} className={movie.avg_rating > 2 ? 'orange' : ''}/>
                        <FontAwesome name={'star'} className={movie.avg_rating > 3 ? 'orange' : ''}/>
                        <FontAwesome name={'star'} className={movie.avg_rating > 4 ? 'orange' : ''}/>
                        ({movie.num_of_ratings})
                        <p>{movie.description}</p>

                        <div className='rate-container'>
                            <h2>Rate it!</h2>
                            {[...Array(5)].map((e, i) => {
                                return <FontAwesome name={'star'} key={i}
                                                    className={this.state.highlighted > i - 1 ? 'purple' : ''}
                                                    onMouseEnter={this.highlightRate(i)}
                                                    onMouseLeave={this.highlightRate(-1)}
                                                    onClick={this.rateClicked(i)}/>
                            })}
                        </div>
                    </div>
                ) : null}
            </React.Fragment>
        )
    }
}

export default MovieDetails