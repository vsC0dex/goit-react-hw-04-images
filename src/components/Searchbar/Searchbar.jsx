// import { useState, useEffect } from 'react';
import { memo } from 'react';

import PropTypes from 'prop-types';

import styles from './searchbar.module.css';
import initialState from './initialState';
import useForm from 'shared/hooks/useForm';

const Searchbar = ({ onSubmit }) => {
  const { state, handleChange, handleSubmit } = useForm({
    initialState,
    onSubmit,
  });

  console.log('form');

  const { search } = state;

  return (
    <>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchForm_button}>
          Search
          <span className={styles.SearchForm_button_label}></span>
        </button>

        <input
          className={styles.SearchForm_input}
          name="search"
          value={search}
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </>
  );
};

export default memo(Searchbar);

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
/*
class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({
      search: '',
    });
  }

  render() {
    const { search } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <>
        <form className={styles.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={styles.SearchForm_button}>
            Search
            <span className={styles.SearchForm_button_label}></span>
          </button>

          <input
            className={styles.SearchForm_input}
            name="search"
            value={search}
            onChange={handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
          />
        </form>
      </>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
*/
