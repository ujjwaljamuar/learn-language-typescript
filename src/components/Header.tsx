import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const style = {
    margin: ".5rem",
    textDecoration: "none",
    color: "white",
};

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h5"
                    marginRight={"auto"}
                    textTransform={"uppercase"}
                >
                    Learn It
                </Typography>

                <Link to={"/"} style={style}>
                    Home
                </Link>
                <Link to={"/login"} style={style}>
                    Login
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
