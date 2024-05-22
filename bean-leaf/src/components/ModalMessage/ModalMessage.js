function ValidationTooltip(props) {
    const { message, isActive } = props;
    console.log(props)
    const tooltipStyle = {
      opacity: isActive ? 1 : 0, 
      transition: "opacity 1s", 
      position: "fixed", 
      right: "20px", 
      bottom: "20px", 
      backgroundColor: "#fdd",
      color: "#a00",
      border: "1px solid #faa",
      borderRadius: "4px",
      padding: "8px 12px",
      fontSize: "14px",
      zIndex: 1000,
    };

    return (
      <div style={tooltipStyle}>
        {message}
      </div>
    );
  }

export default ValidationTooltip