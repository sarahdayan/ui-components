import React, { Component } from "react";
import PropTypes from "prop-types";
import { Highlight, connectAutoComplete } from "react-instantsearch-dom";
import AutoSuggest from "react-autosuggest";
import "./Autocomplete.css";

class AutoComplete extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentRefinement: PropTypes.string.isRequired,
    refine: PropTypes.func.isRequired,
    onSuggestionSelected: PropTypes.func.isRequired,
  };

  state = {
    value: this.props.currentRefinement,
  };

  onChange = (_, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.refine(value);
  };

  onSuggestionsClearRequested = () => {
    this.props.refine();
  };

  getSuggestionValue(hit) {
    return `${hit.name} (${hit.objectID})`;
  }

  renderSuggestion(hit) {
    return (
      <>
        <Highlight attribute="name" hit={hit} tagName="mark" /> ({hit.objectID})
      </>
    );
  }

  render() {
    const { hits, onSuggestionSelected } = this.props;
    const { value } = this.state;

    const inputProps = {
      placeholder: "Search for a product...",
      onChange: this.onChange,
      value,
    };

    return (
      <AutoSuggest
        suggestions={hits}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default connectAutoComplete(AutoComplete);
