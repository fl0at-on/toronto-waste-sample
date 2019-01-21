import React from "react";
import ReactHtmlParser from "react-html-parser";

const Item = props => {
  //console.log(props);
  let { item } = props;

  return (
    <React.Fragment>
      <ul className="grid-result">
        <li className="grid-fav-1">
          <span>
            <input id={item.id} name={item.id} type="checkbox" hidden />
            <label
              id={item.id}
              name={item.id}
              htmlFor={item.id}
              onClick={e => props.onClick(e)}
            >
              <i name={item.id} className="grid-star fa fa-star " />
            </label>
          </span>
          {item.title}
        </li>
        <li className="grid-fav-2">
          {ReactHtmlParser(ReactHtmlParser(item.body))}
        </li>
      </ul>
    </React.Fragment>
  );
};
export default Item;
