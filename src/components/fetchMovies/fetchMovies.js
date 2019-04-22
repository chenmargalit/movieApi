import React, { Component } from 'react';
import MovieModal from '../../containers/Modal/Modal';
import { TextArea } from 'semantic-ui-react';

import { url } from '../../containers/Url/url';

import './fetchMovies.css';
const axios = require('axios');

class fetchMovies extends Component {
  state = {
    movies: [],
    suggestions: [],
    text: '',
    selected: ''
  };

  // On component mount, fetch the list
  componentWillMount() {
    axios
      .get(url)
      .then(res => {
        // this.state.movies should hold movies data
        this.setState({ movies: res.data.results });
      })
      .catch(err => {
        // if there's an error, console it
        console.log('problem with fetching:', err);
      });
  }

  onTextChanged = e => {
    // value of input
    const value = e.target.value;
    let suggestions = [];
    const regex = new RegExp(`^${value}`, 'i');
    const moviesFirst = this.state.movies.map(movie => movie.title);
    if (value.length > 0) {
      // turn written value into a regular expression
      const regex = new RegExp(`^${value}`, 'i');
      // get each movie's title
      const moviesSecond = this.state.movies.map(movie => movie.title);
      // append suggestions with the regular expression and corresponding movie titles
      suggestions = moviesSecond.sort().filter(v => regex.test(v));
      // this.state.suggestions gets the suggestions, text gets the input's value
      this.setState({ suggestions, text: value });
      // if input is empty, clear suggestions
    } else if (value.length === 0) {
      this.setState({ text: value, suggestions: [] });
    } else {
      this.setState({
        text: value,
        suggestions: moviesFirst.sort().filter(v => regex.test(v))
      });
    }
  };
  // pick a specific suggestion
  suggestionSelected = value => {
    this.setState({
      suggestions: [],
      text: value,
      selected: value
    });
  };

  // show all auto complete suggestions
  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    } else {
      return (
        <div>
          {this.state.suggestions.map(item => (
            <p
              style={{ color: 'green', marginTop: 10, cursor: 'pointer' }}
              // on clicked a suggestion, activate suggestionSelected func and give access to the respective data
              onClick={() => this.suggestionSelected(item)}
              key={item}
            >
              {item}
            </p>
          ))}
        </div>
      );
    }
  }

  render() {
    const { text, movies, selected } = this.state;
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          {/* input */}
          <TextArea
            className='input'
            style={{
              width: '20%',
              textAlign: 'center',
              paddingTop: 32
            }}
            value={text}
            onChange={this.onTextChanged}
            type='text'
          />
          {this.renderSuggestions()}
        </div>
        {/* map through all movies */}
        {this.state.text.length > 0 && (
          <div className='movieDiv'>
            {movies.map(movie =>
              movie.title === selected ? (
                <div key={movie.id}>
                  <ul className='movie' key={movie.id}>
                    <div>
                      {/* give some seemingly important data about the movie, could be anything else as well */}
                      <li>{movie.title}</li>
                      <li>vote average: {movie.vote_average}</li>
                      <li>vote count: {movie.vote_count}</li>
                      <li>
                        {/* This is a dummy calculation, NOT statistically well thought of It is made to express the idea in which, sample size must be taken into account when calculating voting ratings */}
                        Chen Score{' '}
                        {Math.round(
                          movie.vote_count / parseInt(movie.vote_average),
                          0
                        )}
                      </li>
                    </div>

                    <div>
                      {/* The modal will show some example data */}
                      <MovieModal
                        // Pass two data props to modal, movie title and overview (summary)
                        title={movie.title}
                        summary={movie.overview}
                      />
                    </div>
                  </ul>
                </div>
              ) : null
            )}
          </div>
        )}
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default fetchMovies;
