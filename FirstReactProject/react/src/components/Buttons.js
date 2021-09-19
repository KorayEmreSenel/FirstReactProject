const TogglableButton = (name, selectedButton, onClick) => {
  const style = selectedButton === name ? "button-selected" : "button";
  return (
    <button className={style} id={name} onClick={onClick}>
      {name.charAt(0).toUpperCase() + name.slice(1, name.length) + "s"}{" "}
    </button>
  );
};

function Buttons(props) {
  return (
    <div className="Col">
      <span
        className="text-start mb-0 h4"
        style={{ color: "#0D6EFD", paddingRight: "15px" }}
      >
        Products
      </span>
      {TogglableButton("shirt", props.selectedButton, props.onClick)}{" "}
      {TogglableButton("mug", props.selectedButton, props.onClick)}
    </div>
  );
}

export default Buttons;
