import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import { Message } from "@mui/icons-material";
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
    marginBottom: "4px",
    borderBottom: "1px solid #f0f0f0",
    paddingBottom: "4px"
  };

  const messageStyles = {
    fontSize: "12px",
    color: "#555",
    lineHeight: "1.3",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    maxHeight: "80px",
    overflow: "auto"
  };

  const iconStyles = {
    color: "#6865A5",
    width: "16px",
    height: "16px"
  };

  const nodeTitle = {
    fontSize: "12px",
    fontWeight: 500,
    color: "#333"
  };

  const handleStyles = {
    background: "#6865A5",
    width: "8px",
    height: "8px",
    border: "2px solid #fff",
    boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)"
  };

  return (
    <div style={nodeStyles}>
      <Handle
        type="target"
        position="left"
        style={{...handleStyles, left: "-5px"}}
        isConnectable={isConnectable}
      />
      
      <div style={headerStyles}>
        <Message style={iconStyles} />
        <div style={nodeTitle}>Mensagem</div>
      </div>
      
      <div style={messageStyles}>
        {data.label}
      </div>
      
      <Handle
        type="source"
        position="right"
        id="a"
        style={{...handleStyles, right: "-5px"}}
        isConnectable={isConnectable}
      />
    </div>
  );
});
