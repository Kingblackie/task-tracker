import PropTypes from 'prop-types'

const Button = ({ color, text, onClick }) => {

  return (
    <button onClick={onClick} style={{ background: color }} className="btn">{text}</button>
  )
}

Button.defaultProps = {
  text: 'Button',
  color: 'steelblue',
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button