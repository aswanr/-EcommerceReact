import "./color.css";

function Color() {
  return (
    <>
    <div className="color-title">
      <div className="all">
        <span className="checkmark"></span>Colour
      <label className="sidebar-label-container">
        <input type="radio" name="test" />
        <span className="checkmark"></span>Black
      </label>
      <label className="sidebar-label-container">
        <input type="radio" name="test" />
        <span className="checkmark"></span>Blue
      </label>
      <label className="sidebar-label-container">
        <input type="radio" name="test" />
        <span className="checkmark"></span>White
      </label>
      <label className="sidebar-label-container">
        <input type="radio" name="test" />
        <span className="checkmark"></span>Green
      </label>
      <label className="sidebar-label-container">
        <input type="radio" name="test" />
        <span className="checkmark"></span>RED
      </label>
      </div>
      </div>
    </>
  );
}

export default Color;
