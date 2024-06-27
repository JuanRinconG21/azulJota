import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const MySwal = withReactContent(Swal2);

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0, 8, 0, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const Navbar = ({ abrir, setAbrir, pageTitle }) => {
  const abrirAside = () => {
    if (abrir === true) {
      setAbrir(false);
    } else {
      setAbrir(true);
    }
  };
  const datos = JSON.parse(localStorage.getItem("user"));
  const [nombre, apellido] = [datos.USU_NOMBRE, datos.USU_APELLIDO];
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const Navigate = useNavigate();
  const CerraSesion = () => {
    MySwal.fire({
      title: "Cerrar Sesión",
      text: "Desea salir?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, deseo salir!",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "Cerrando!",
          text: "Hasta pronto!",
          icon: "success",
        });
        setTimeout(() => {
          Navigate("/Dashboard/Cerrar");
        }, 500);
      }
    });
  };

  return (
    <>
      <nav className="main-nav--bg ">
        <div className="container main-nav">
          <div className="main-nav-start">
            <div className="search-wrapper">
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Buscar"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </div>
          </div>
          <div className="main-nav-end">
            <button
              className="sidebar-toggle transparent-btn"
              title="Menu"
              type="button"
              onClick={abrirAside}
            >
              <span className="sr-only">Toggle menu</span>
              <span
                className="icon menu-toggle--gray"
                aria-hidden="true"
              ></span>
            </button>

            <div className="nav-user-wrapper">
              <button
                href="##"
                className="nav-user-btn dropdown-btn"
                title=""
                type="button"
              >
                <span className="sr-only">My profile</span>
                <span className="nav-user-img">
                  <Box sx={{ flexGrow: 0 }}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar {...stringAvatar(`${nombre} ${apellido}`)} />
                    </IconButton>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{"Perfil"}</Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={(e) => {
                          handleCloseUserMenu(), CerraSesion();
                        }}
                      >
                        <Typography textAlign="center">
                          <ExitToAppIcon /> Cerrar sesión
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
