import {
  ArrowForwardIos,
  ContentCopy,
  Delete,
  DynamicFeed,
  ImportExport,
  Message
} from "@mui/icons-material";
import React, { memo } from "react";

import { Handle } from "react-flow-renderer";
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
    fontSize: "11px",
    color: "#555",
    lineHeight: "1.3",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    maxHeight: "40px",
    overflow: "auto",
    marginBottom: "6px",
    backgroundColor: "#f9f9f9",
    padding: "4px",
    borderRadius: "4px",
    borderLeft: "2px solid #683AC8"
  };

  const iconStyles = {
    color: "#683AC8",
    width: "16px",
    height: "16px"
  };

  const nodeTitle = {
    fontSize: "12px",
    fontWeight: 500,
    color: "#333"
  };

  const handleStyles = {
    background: "#683AC8",
    width: "8px",
    height: "8px",
    border: "2px solid #fff",
    boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)"
  };

  const optionStyles = {
    fontSize: "10px",
    padding: "2px 4px",
    marginBottom: "2px",
    backgroundColor: "#f0f0f0",
    borderRadius: "3px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  };

  const optionNumberStyles = {
    backgroundColor: "#683AC8",
    color: "white",
    borderRadius: "50%",
    width: "14px",
    height: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    fontWeight: "bold",
    marginRight: "4px"
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
        <DynamicFeed style={iconStyles} />
        <div style={nodeTitle}>Menu</div>
      </div>
      
      <div style={messageStyles}>
        {data.message}
      </div>
      
      <div style={{marginBottom: "4px"}}>
        {data.arrayOption.map((option, index) => (
          <div key={index} style={optionStyles}>
            <div style={{display: "flex", alignItems: "center"}}>
              <div style={optionNumberStyles}>{option.number}</div>
              <span>{option.value}</span>
            </div>
            <Handle
              type="source"
              position="right"
              id={`handle-${index}`}
              style={{
                ...handleStyles, 
                position: "relative",
                right: "-5px",
                display: "inline-block",
                marginLeft: "4px"
              }}
              isConnectable={isConnectable}
            />
          </div>
        ))}
      </div>
    </div>
  );
});
