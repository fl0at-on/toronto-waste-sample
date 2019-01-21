import React from "react";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";
//import "font-awesome/css/font-awesome.min.css";

//https://cdn.shopify.com/static/web-eng-challenge-summer-2019/index.md
//https://cdn.shopify.com/static/web-eng-challenge-summer-2019/design.png

const APIURL = "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR";

class CallApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      response: "",
      filteredResponse: "",
      favorites: ""
    };
  }

  handleChange = e => {
    const searchText = this.refs.searchtext.value;
    if (!searchText) {
      this.setState({
        searchValue: "",
        response: "",
        filteredResponse: "",
        favorites: ""
      });
    }
  };

  convertRawHTML() {
    var rawMarkup = this.props.filteredResponse;
    return { __html: rawMarkup };
  }

  handleToggle = e => {
    const idx = e.target.parentNode.id;
    const selected = this.state.filteredResponse[idx];

    const newFavorites = [...this.state.favorites, selected];
    //console.log(idx);
    //console.log(selected);

    //add/remove from favorited?
    //loop through favorited array, find the id?

    this.setState({ favorites: newFavorites });
  };
  callAPI = async () => {
    const data = await fetch(APIURL);

    const body = data.json();

    return body;
  };
  componentDidMount() {
    this.callAPI();
  }

  searchDetails = e => {
    e.preventDefault();
    //keyword user is searching for
    const searchValue = this.refs.searchtext.value
      .replace(/\s+/g, "")
      .toLowerCase();

    //query the API
    this.callAPI().then(arr => {
      //filter the results to align w/ ref text
      const filtered = arr.filter(item =>
        item.keywords
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(searchValue)
      );

      //save results
      this.setState(
        { searchValue: searchValue, response: arr, filteredResponse: filtered } //,
        //() => console.log(this.state)
      );
    });
  };

  render() {
    return (
      <div className="container">
        <span dangerouslySetInnerHTML={this.convertRawHTML()} />

        <h1 className="grid-header">Toronto Waste Lookup</h1>
        <form className="grid-search" onSubmit={e => this.searchDetails(e)}>
          <input
            type="text"
            ref="searchtext"
            onChange={e => this.handleChange(e)}
          />
          <button type="submit">
            <i className="search-btn fa fas fa-search" />
          </button>
        </form>
        {this.state.filteredResponse &&
          this.state.filteredResponse.map((item, i) => {
            return (
              <ul className="grid-result" key={i}>
                <li className="grid-fav-1">
                  <span>
                    <input id={i} name={i} type="checkbox" hidden />
                    <label
                      id={i}
                      name={i}
                      htmlFor={i}
                      onClick={e => this.handleToggle(e)}
                    >
                      <i ref={i} className="grid-star fa fa-star " />
                    </label>
                  </span>
                  {item.title}
                </li>
                <li className="grid-fav-2">
                  {ReactHtmlParser(ReactHtmlParser(item.body))}
                </li>
              </ul>
            );
          })}

        {this.state.favorites && (
          <ul className="grid-fav" style={{ lineStyleType: "none" }}>
            <li>Favorites</li>
            {this.state.favorites &&
              this.state.favorites.map((item, i) => {
                return (
                  <ul className="grid-result" key={i}>
                    <li className="grid-fav-1">
                      <span>
                        <input id={i} name={i} type="checkbox" hidden />
                        <label
                          id={i}
                          name={i}
                          htmlFor={i}
                          onClick={e => this.handleToggle(e)}
                        >
                          <i ref={i} className="grid-star fa fa-star " />
                        </label>
                      </span>
                      {item.title}
                    </li>
                    <li className="grid-fav-2">
                      {ReactHtmlParser(ReactHtmlParser(item.body))}
                    </li>
                  </ul>
                );
              })}
          </ul>
        )}
      </div>
    );
  }
}

export default CallApp;
