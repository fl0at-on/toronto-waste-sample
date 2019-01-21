import React from "react";
import _ from "lodash";
//components
import { Results } from "../src/components/Results.js";
import Search from "../src/components/Search.js";
import { Favorites } from "../src/components/Favorites.js";

const uuidv4 = require("uuid/v4");

//https://cdn.shopify.com/static/web-eng-challenge-summer-2019/index.md
//https://cdn.shopify.com/static/web-eng-challenge-summer-2019/design.png

const APIURL = "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR";

class CallApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      response: [],
      filteredResponse: [],
      favorites: []
    };
  }

  handleChange = e => {
    //console.log(e.target.value);
    const searchText = e.target.value; //this.refs.searchtext.value;
    if (!searchText) {
      this.setState({
        searchValue: "",
        response: [],
        filteredResponse: []
        //favorites: []
      });
    } else {
      this.setState({ searchValue: e.target.value });
    }
  };

  handleToggle = e => {
    const choiceID = e.target.parentNode.id;
    //console.log(choiceID);

    const selectedObject = this.state.filteredResponse.find(obj => {
      return obj.id === choiceID;
    });

    let newFavorites = [];

    if (
      !this.state.favorites.find(obj => {
        return obj.id === choiceID;
      })
    ) {
      //add it
      //console.log("adding");
      newFavorites = [...this.state.favorites, selectedObject];
      //console.log(newFavorites);
    } else {
      //remove it
      //console.log("removing");
      newFavorites = this.state.favorites.filter(obj => {
        return obj.id !== choiceID;
      });
    }

    //set state
    this.setState(
      { favorites: newFavorites } //, () =>
      // console.log(this.state.favorites)
    );
  };

  callAPI = async () => {
    const data = await fetch(APIURL);

    const body = data.json();

    return body;
  };

  convertRawHTML = () => {
    var rawMarkup = this.props.result;
    return { __html: rawMarkup };
  };
  componentDidMount() {
    this.callAPI();
  }

  searchDetails = e => {
    e.preventDefault();
    //keyword user is searching for
    const searchValue = this.state.searchValue //this.refs.searchtext.value
      .replace(/\s+/g, "")
      .toLowerCase();

    //query the API
    this.callAPI().then(arr => {
      //assign UUIDs to those that do not have id fields
      const improvedArr = arr.map(obj => {
        if (!obj.id) {
          return { id: uuidv4(), ...obj };
        } else {
          return obj;
        }
      });

      //filter the results to align w/ ref text
      //removing spaces w/ regex
      const filtered = improvedArr.filter(item =>
        item.keywords
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(searchValue)
      );

      //compare current favorite list to the new information
      //match against obj properties to see if they are the same
      //if so, add the same id to the new information

      let updatedFavoriteArray = this.state.favorites || [];

      if (updatedFavoriteArray.length !== 0) {
        updatedFavoriteArray = improvedArr.filter(obj => {
          return this.state.favorites.some(fav => {
            return _.isEqual(_.omit(fav, ["id"]), _.omit(obj, ["id"]));
          });
        });
      }

      //set state
      this.setState(
        {
          searchValue: searchValue,
          response: improvedArr,
          filteredResponse: filtered,
          favorites: updatedFavoriteArray
        } //,
        //() => console.log(this.state)
      );
    });
  };

  render() {
    // console.log(this.state.favorites);
    // console.log(this.state.favorites.length);
    return (
      <div className="container">
        <span dangerouslySetInnerHTML={this.convertRawHTML()} />
        <header>
          <h1 className="grid-header">Toronto Waste Lookup</h1>
        </header>
        <Search
          onChange={e => this.handleChange(e)}
          onSubmit={e => this.searchDetails(e)}
        />

        {this.state.response && (
          <Results
            result={this.state.filteredResponse}
            onClick={e => this.handleToggle(e)}
            favoriteList={this.state.favorites}
          />
        )}

        {!this.state.favorites.length < 1 && (
          <Favorites
            //{...this.props}
            favorites={this.state.favorites}
            onClick={e => this.handleToggle(e)}
          />
        )}
      </div>
    );
  }
}

export default CallApp;
