import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { setContext } from '../auth/AuthProvider';

export interface ISState {
    user: {
        email: string;
        password: string;
    };
}

const LOGIN_MUTATION = gql`
    mutation loginMutation($user: UserInput!) {
        login(user: $user) {
            token
            email
            password
            id
        }
    }
`;

function Login() {
    const [user, setUser] = useState<ISState['user']>({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const navigate = useNavigate();

    const [loginMutation] = useMutation(LOGIN_MUTATION, {
        onCompleted: (data) => {
            setContext(data.login, data.login.token);
            navigate('/dashboard');
        },
        onError: (error) => console.log(error),
    });

    const handleClick = async (e: any, userData: ISState['user']) => {
        e.preventDefault();
        loginMutation({ variables: { user: userData } });
    };

    return (
        <div className="box">
            <h1 className="text">Login</h1>

            <div className="form-wrapper">
                <input
                    className="input"
                    type="text"
                    onChange={handleChange}
                    name="email"
                    value={user.email}
                    placeholder="Type your email"
                />
                <input
                    className="input"
                    type="password"
                    onChange={handleChange}
                    name="password"
                    value={user.password}
                    placeholder="Type your password"
                />
                <br />
                <button className="formBtn" type="submit" onClick={(e) => handleClick(e, user)}>
                    Login
                </button>
                <br />
                <span className="paragraph">
                    Not a member?
                    <Link to="/signup" className="btn transferBtn" type="button">
                        Register here
                    </Link>
                </span>
            </div>
        </div>
    );
}

export default Login;
