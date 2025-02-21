import { useNavigate } from "react-router-dom";

interface SetUsers {
  id: number;
  first_name: string;
  password: string;
}

interface HeaderProps {
  setusers: SetUsers;
}

function Header({ setusers }: HeaderProps) {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="logo">Shoppee</div>
      <ul className="nav-links">
        <li>{setusers?.first_name ?? "Guest"}</li>
        <li>Shorts</li>
        <li>Jackets</li>
        <li>Pants</li>
        <li>Shoes</li>
      </ul>
      <div className="nav-buttons">
        <button
          className="btn btn-signin"
          onClick={() => {
            navigate("/signout");
          }}
        >
          Sign OUT
        </button>
        <button className="btn btn-saved">Carts(0)</button>
      </div>
    </nav>
  );
}

export default Header;
