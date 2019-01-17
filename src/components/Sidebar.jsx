import React from "react";
// import styled from "styled-components";
// import getSelectedLocatoinId from "../locationGetter";

function Sidebar({ selectedLocationId, observationLocations, setSelectedLocation }) {

  // Sidebar styling
  const sidebarStyle = {
    overflowY: "scroll",
    width: "100%",
    top: "0",
    height: "100vh",
    position: "relative",
    cursor: "pointer",
    zIndex: "10",
    opacity: "0"
  };
  return (
    <div style={{ width: "300px" }}>
      <div
        className="list-group-flush zindex-fixed border-right"
        style={observationLocations.length == 0 ? { opacity: "0" } : { opacity: "1" }}
        id="sidebar"
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
    </div>
  );
}

export default Sidebar;
