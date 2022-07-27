/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import '../../public/styles.css';

export default function Navbar() {
    // const { pathname } = useLocation();
    // todo: query to check auth status
    const { user, setUser } = useAuth();
    // FIXME: navbar show only on scroll up, not down
    const [show, setShow] = useState('block');
    const controlNavbar = () => {
        if (window.scrollY > 100) {
            setShow('none');
        } else {
            setShow('block');
        }
    };

    function logout() {
        setUser({ user: null, setUser: '', loading: true });
        localStorage.clear();
    }

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, []);

    return (
        <div>
            <div
                id="navbar"
                style={{
                    display: show,
                    // backgroundColor: pathname === '/dashboard' ? '#092173' : '#fff',
                    // color: pathname === '/dashboard' ? '#fff' : '#092173',
                }}
            >
                <Link to="/" type="submit" className="linkBtn">
                    Home
                </Link>
                <Link to="/demo" type="submit" className="linkBtn">
                    Demo
                </Link>
                <Link to="/about" type="submit" className="linkBtn">
                    About
                </Link>
            </div>
            <div
                id="side-navbar"
                style={{
                    display: show,
                    // backgroundColor: pathname === '/dashboard' ? '#092173' : '#fff',
                    // color: pathname === '/dashboard' ? '#fff' : '#092173',
                }}
            >
                {user === null ? (
                    <>
                        <Link to="/login" type="submit" className="linkBtn">
                            Login
                        </Link>
                        <Link to="/signup" type="submit" className="linkBtn">
                            Signup
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/dashboard" type="submit" className="linkBtn">
                            Dashboard
                        </Link>
                        <button type="button" onClick={logout}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
