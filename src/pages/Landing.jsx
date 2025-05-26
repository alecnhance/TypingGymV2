import { NavLink } from 'react-router-dom';


const Landing = () => {
    return (
        <div>
            <h1>Landing</h1>
            <NavLink to="/signIn">
                Sign In
            </NavLink>
        </div>
    );
};

export default Landing;
