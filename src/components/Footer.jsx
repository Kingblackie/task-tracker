import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="Footer">
      <p>Copyright &copy; 2023</p>
      <Link to="/about">About Task Tracker</Link>
    </footer>
  )
}

export default Footer