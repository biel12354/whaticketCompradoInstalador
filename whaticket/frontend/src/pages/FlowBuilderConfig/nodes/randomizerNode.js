import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import { CallSplit } from "@mui/icons-material";
import { useNodeStorage } from "../../../stores/useNodeStorage";

export default memo(({ data, isConnectable, id }) => {
  const storageItems = useNodeStorage();

  const nodeStyles = {
    backgroundColor: "#ffffff",
    padding: "8px 10px",
    borderRadius: "8px",
    color: "#333",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    border: "1px solid #e0e0e0",
    width: "180px",
    transition: "all 0.2s ease"
  };

  const headerStyles = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    marginBottom: "6px",
    borderBottom: "1px solid #f0f0f0",
    paddingBottom: "4px"
  };

  const iconStyles = {
    color: "#1FBADC",
    width: "16px",
    height: "16px"
  };

  const nodeTitle = {
    fontSize: "12px",
    fontWeight: 500,
    color: "#333"
  };

  const handleStyles = {
    background: "#1FBADC",
    width: "8px",
    height: "8px",
    border: "2px solid #fff",
    boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)"
  };

  const percentageContainerStyles = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "4px"
  };

  const percentageStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    width: "45%"
  };

  const percentValueStyles = {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1FBADC",
    marginBottom: "2px"
  };

  const percentBarStyles = {
    width: "100%",
    height: "4px",
    backgroundColor: "#f0f0f0",
    borderRadius: "2px",
    position: "relative",
    overflow: "hidden"
  };

  const percentFillStyles = (percent) => ({
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    width: `${percent}%`,
    backgroundColor: "#1FBADC",
    borderRadius: "2px"
  });

  return (
    <div style={nodeStyles}>
      <Handle
        type="target"
        position="left"
        style={{...handleStyles, left: "-5px"}}
        isConnectable={isConnectable}
      />
      
      <div style={headerStyles}>
        <CallSplit style={iconStyles} />
        <div style={nodeTitle}>Randomizador</div>
      </div>
      
      <div style={percentageContainerStyles}>
        <div style={percentageStyles}>
          <div style={percentValueStyles}>{data.percent}%</div>
          <div style={percentBarStyles}>
            <div style={percentFillStyles(data.percent)} />
          </div>
          <div style={{fontSize: "9px", color: "#666", marginTop: "2px"}}>Caminho A</div>
          <Handle
            type="source"
            position="right"
            id="a"
            style={{
              ...handleStyles,
              position: "absolute",
              right: "-20px",
              top: "40%"
            }}
            isConnectable={isConnectable}
          />
        </div>
        
        <div style={{
          width: "1px",
          backgroundColor: "#e0e0e0",
          margin: "0 4px"
        }} />
        
        <div style={percentageStyles}>
          <div style={{...percentValueStyles, color: "#666"}}>{100 - data.percent}%</div>
          <div style={percentBarStyles}>
            <div style={percentFillStyles(100 - data.percent)} />
          </div>
          <div style={{fontSize: "9px", color: "#666", marginTop: "2px"}}>Caminho B</div>
          <Handle
            type="source"
            position="right"
            id="b"
            style={{
              ...handleStyles,
              position: "absolute",
              right: "-20px",
              top: "40%"
            }}
            isConnectable={isConnectable}
          />
        </div>
      </div>
    </div>
  );
});
