import React, { Component } from "react";
import css from "./Searchbar.module.css";

class Searchbar extends Component {
  state = {query: ''};

  handleChange = e => {
      this.setState({query: e.target.value})
  }

  handleSubmit = e => {
      e.preventDefault();
      this.props.onSubmit(1, this.state.query);
      this.setState({query: ''})
      e.target.children[1].value = "";
  }

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <span className={css.SearchForm_button_label}>Search</span>
          </button>
          <input
            className={css.SearchForm_input}
            onChange={this.handleChange}
            type="text"
            // autocomplete = "off"
            // autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
