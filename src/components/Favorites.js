import React from "react";

import Item from "./Item.js";

export class Favorites extends React.Component {
  render() {
    //console.log(this.props);
    let { favorites } = this.props;

    return (
      <React.Fragment>
        <p className="fav-header">Favourites</p>

        {favorites.map((item, i) => {
          return (
            <Item
              key={item.id}
              item={item}
              onClick={e => this.props.onClick(e)}
              toggled={true}
            />
          );
        })}
      </React.Fragment>
    );
  }
}
