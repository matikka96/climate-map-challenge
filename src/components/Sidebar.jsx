import React from "react";
// import styled from "styled-components";
// import getSelectedLocatoinId from "../locationGetter";

function Sidebar({
  selectedLocationId,
  observationLocations,
  setSelectedLocation
}) {
  const sidebarStyle = {
    overflowY: "scroll",
    width: "300",
    float: "left",
    top: "0",
    height: "100vh",
    position: "relative",
    cursor: "pointer",
    zIndex: "10"
  };
  return (
    <div
      className="list-group-flush zindex-fixed border-right"
      style={sidebarStyle}
    >
      <div className="list-group-item list-group-item-action active sticky-top">
        <b>Valitse asema:</b>
      </div>
      {observationLocations.map(l => (
        <div
          className={
            l.info.id === selectedLocationId
              ? "list-group-item list-group-item-secondary"
              : "list-group-item list-group-item-action"
          }
          key={l.info.id}
          onClick={() => setSelectedLocation(l.info.id)}
        >
          {l.info.name}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
