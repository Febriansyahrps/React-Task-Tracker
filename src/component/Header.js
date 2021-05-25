import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'


import Button from './Button'

const Header = ({title, onAdd, showAdd}) => {
    const location = useLocation()

    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname === '/' && (
                <Button 
                    onClick={onAdd} 
                    text={showAdd ? 'close' : 'show'}
                    color={showAdd  ? 'red' :' green'}
            />)}
        </header>
    )
}

Header.defaultProps = {
    title: 'The Apps',
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

// CSS in JS
// // const HeadingStyle = {
// //     color: 'red'
// }

export default Header
