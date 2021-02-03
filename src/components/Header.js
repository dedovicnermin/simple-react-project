import PropTypes from 'prop-types';
import Button from './Button';



// rafce tab ==== boilerplate for an arrow function component
//{title} is just destructoring the props object. (props) => props.title
const Header = ({title, onAdd, propShowAdd}) => {
    
    return (
        <header className='header'>
            {/* inline style requires style={{code inside headingStyle}} */}
            {/* <h1 style={headingStyle}>{title}</h1> */}
            <h1>{title}</h1>
            <Button 
                color={propShowAdd ? 'red' : 'green'}
                text={propShowAdd ? 'Close' : 'Add'}
                onClick={onAdd} 
            />
            
            

        </header>
    );
}

Header.defaultProps = {
    title: 'Task Tracker'
};

Header.propTypes = {
    title: PropTypes.string.isRequired
}

const headingStyle = {
    color: 'red',
    backgroundColor: 'black'
}

export default Header;
