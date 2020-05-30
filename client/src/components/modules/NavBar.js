import React, { useState, useContext } from "react";

// Routing 
import { Link, navigate } from "@reach/router";
import { Nav, Navbar } from "react-bootstrap";
import Login from "./Login";
import { auth } from "../../firebase_config.js";
import { UserContext } from "../../providers/UserProvider.js";

// Scrolling
import { refs, scrollToRefOrPage } from "./Ref.js";

// Styling assets.
import "../../utilities.css";
import "./NavBar.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useTheme} from "@material-ui/core/styles";

// logo asset
import logo from "../../assets/images/logo.svg";

/**
 * Navigation bar that should be on top of all pages. 
 * Takes no props, but needs to be under UserProvider.
 * Renders links conditional on whether the user is logged in or not.
 */

const buttonStyle = {
    color: "#FFFFFF",
    backgroundColor: "#DF4F59",
    textTransform: 'none',

}

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const userProvider = useContext(UserContext);
    const logout = () => {
        auth.signOut();
    }
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const loginDialog = (
        <div className="Navbar-loginDialog">
            <Dialog fullScreen={fullScreen} aria-labelledby="loginDialog" open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Login</DialogTitle>
                <Login onLogin={()=> setOpen(false)} />
            </Dialog>
        </div>
    );
    const loggedIn = userProvider.user !== undefined;

    const userLinks = loggedIn ? (
        <>
            <Button className="NavBar-link" style={buttonStyle} onClick={() => {
                logout()
                navigate("/");
            }}>
                Sign out
            </Button>
        </>
    ) : (
        <>
            <Nav.Link as={Link} to="/register">
                <div className="NavBar-link">
                    Register
                </div>
            </Nav.Link>
            <Button className="NavBar-link" style={buttonStyle} onClick={() => setOpen(true)}>
                Sign In
            </Button>
            {loginDialog}
        </>
    )


    return (
        <div className="u-screenCenter">
            <Navbar collapseOnSelect fixed="sticky-top" expand="sm" variant="light">
                <Navbar.Brand className=".NavBar-logotitle" as={Link} to="/">
                    <img className="logo-image" src={logo}/>
                    BuildConnect
                </Navbar.Brand>
                <Navbar.Toggle className="NavBar-toggle" aria-controls="responsive-navbar-nav"  />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end ">
                    <Nav className={`NavBar-linkContainer ${'ml-auto'}`}>
                        <Nav.Link onClick={() => scrollToRefOrPage(refs.about, "/about")}>
                            <div className="NavBar-link">
                                About Us
                            </div>
                        </Nav.Link>
                        <Nav.Link onClick={() => scrollToRefOrPage(refs.contact, "/contact")}>
                            <div className="NavBar-link">
                                Contact
                            </div>
                        </Nav.Link>
                        {userLinks}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
 }

 export default NavBar;