import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import { RocketLaunch } from "@mui/icons-material";
import { useNodeStorage } from "../../../stores/useNodeStorage";

export default memo(({ data, isConnectable, id }) => {
  const storageItems = useNodeStorage();

  const nodeStyles = {
    backgroundColor: "#4CAF50",
    padding: "8px 10px",
    borderRadius: "8px",
    color: "#fff",
    boxShadow: "0 2px 8px rgba(76, 175, 80, 0.3)",
    width: "180px",
    transition: "all 0.2s ease",
    position: "relative"
  };

  const headerStyles = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    marginBottom: "4px"
  };

  const nodeTitle = {
    fontSize: "13px",
    fontWeight: 600,
    color: "#fff"
  };

  const handleStyles = {
    background: "#fff",
    width: "8px",
    height: "8px",
    border: "2px solid #4CAF50",
    boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)"
  };

  const pulseAnimation = {
    position: "absolute",
    top: "-2px",
    left: "-2px",
    right: "-2px",
    bottom: "-2px",
    borderRadius: "10px",
    border: "1px solid rgba(76, 175, 80, 0.3)",
    animation: "pulse 2s infinite",
    pointerEvents: "none"
  };

  return (
    <div style={nodeStyles}>
      <div style={pulseAnimation}></div>
      
      <div style={headerStyles}>
        <RocketLaunch style={{ color: "#fff", width: "16px", height: "16px" }} />
        <div style={nodeTitle}>Início do fluxo</div>
      </div>
      
      <div style={{ fontSize: "11px", opacity: "0.9" }}>
        Este bloco marca o início do seu fluxo
      </div>
      
      <Handle
        type="source"
        position="right"
        id="a"
        style={{...handleStyles, right: "-5px"}}
        isConnectable={isConnectable}
      />
      
      <style jsx="true">{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          70% {
            transform: scale(1.03);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
});
