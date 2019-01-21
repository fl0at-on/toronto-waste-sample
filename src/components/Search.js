import React from "react";

export default class Search extends React.Component {
  render() {
    return (
      <form className="grid-search" onSubmit={e => this.props.onSubmit(e)}>
        <input
          type="text"
          ref="searchtext"
          onChange={e => this.props.onChange(e)}
        />
        <button type="submit">
          <i className="search-btn fa fas fa-search" />
        </button>
      </form>
    );
  }
}
