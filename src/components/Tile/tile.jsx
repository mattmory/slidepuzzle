import React from "react";
import "./tile.css";

const tile = props => {
  let tileId = "tile" + props.classId;
  if(props.tile.id === "blank") {
    return(<div></div>);
  }
  return (<div className="tile-div" id={tileId} onClick={props.click}><img className="tile-img" src={props.tile.imgSrc} alt="Image"/></div>);
};

export default tile;