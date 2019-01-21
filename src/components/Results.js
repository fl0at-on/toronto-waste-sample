import React from "react";
import Item from "./Item.js";

export class Results extends React.Component {
  render() {
    //console.log(this.props);
    let { result } = this.props;

    return (
      <React.Fragment>
        {result.map((item, i) => {
          return (
            <Item
              key={item.id}
              item={item}
              onClick={e => this.props.onClick(e)}
            />
          );
        })}
      </React.Fragment>
    );
  }
}
