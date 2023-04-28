import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import "react-pro-sidebar/dist/css/styles.css";
import { useEffect } from "react";
const Item = ({ title, to, icon, selected, setSelected, isCollasped, sx }) => {
  return (
    <MenuItem
      active={selected === title}
      style={sx}
      onClick={
        setSelected
          ? () => {
              setSelected(title);
            }
          : () => 1
      }
      icon={icon}
    >
      {!isCollasped && (
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "15.4287px",
            lineHeight: "23px;",
            /* identical to box height, or 150% */

            letterSpacing: "0.01em;",
            color: "#5D7285",
            //   color: "#09234F",
          }}
        >
          {title}
        </Typography>
      )}
      <Link to={to} />
    </MenuItem>
  );
};
const Sidebar = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("userInfo"));
    if (items) {
      setItems(items);
    }
  }, []);
  const [isCollasped, setCollasped] = useState(false);
  const [selected, setSelected] = useState("Tổng quan");
  return (
    <Box
      padding={isCollasped ? "0px" : "0px"}
      boxShadow="0px 3.2943px 37.0609px rgba(0, 0, 0, 0.08);"
      sx={{
        "& .pro-sidebar": {
          width: isCollasped ? "50px" : "260px",
        },
        "& .pro-sidebar > .pro-sidebar-inner": {
          background: `white !important`,
        },
        "& .pro-sidebar .pro-menu.shaped .pro-menu-item > .pro-inner-item > .pro-icon-wrapper":
          {
            backgroundColor: "transparent !important",
          },
        "& .pro-inner-item": {
          marginBottom: "20px",
        },
        "& .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item:hover": {
          color: "#09234F !important",
        },
        "& .pro-menu-item.active": {
          padding: isCollasped ? "0px" : "0px 0px 0px 7.71433px;",
          color: "#09234F !important",
          background: "rgba(9, 35, 79, 0.14);",
          borderRadius: "8.43338px;",
          "& .MuiTypography-root": {
            fontWeight: 600,
          },
        },
      }}
    >
      <ProSidebar collapsed={isCollasped}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setCollasped(!isCollasped)}
            icon={
              isCollasped ? (
                <MenuOutlinedIcon sx={{ fontSize: "30px" }} />
              ) : undefined
            }
            style={{
              margin: "10px 0px 20px 0px",
              color: "black",
            }}
          >
            {!isCollasped && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignContent="center"
                ml="15px"
              >
                <Avatar alt="Remy Sharp" src={`${items.avatar}`} />
                <Typography
                  variant="h6"
                  color={"black"}
                  fontWeight="bold"
                  sx={{
                    m: "10px 0 0 0",
                    fontSize: "15.43px",
                    fontWeight: "bold",
                  }}
                >
                  {items.name}
                </Typography>
                <IconButton onClick={() => setCollasped(!isCollasped)}>
                  <MenuOutlinedIcon sx={{ fontSize: "30px" }} />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignContent="center"
              ></Box>
              <Box
                paddingInline={isCollasped ? "5%" : "7%"}
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: "15.4287px;",
                  lineHeight: "23px;",
                  letterSpacing: "0.01em;",
                  color: "#09234F",
                }}
              >
                <Item
                  title="Tổng quan"
                  to="/"
                  icon={
                    <HomeRoundedIcon
                      //   fontSize="large"
                      sx={{ fontSize: "30px" }}
                    />
                  }
                  selected={selected}
                  setSelected={setSelected}
                  isCollasped={isCollasped}
                />
                <Item
                  title="Quản lý thiết bị"
                  to="/dManage"
                  icon={<PeopleOutlinedIcon sx={{ fontSize: "30px" }} />}
                  selected={selected}
                  setSelected={setSelected}
                  isCollasped={isCollasped}
                />{" "}
                <Item
                  title="Xem sao lưu"
                  to="/save"
                  icon={<PersonOutlinedIcon sx={{ fontSize: "30px" }} />}
                  selected={selected}
                  setSelected={setSelected}
                  isCollasped={isCollasped}
                />
                <Item
                  title="Quản lý hiện vật"
                  to="/oManage"
                  icon={<ReceiptOutlinedIcon sx={{ fontSize: "30px" }} />}
                  selected={selected}
                  setSelected={setSelected}
                  isCollasped={isCollasped}
                />
                <Item
                  title="Dashboard"
                  to="/dashboard"
                  icon={<ReceiptOutlinedIcon sx={{ fontSize: "30px" }} />}
                  selected={selected}
                  setSelected={setSelected}
                  isCollasped={isCollasped}
                />
                <Item
                  title="Đăng xuất"
                  to="/login"
                  icon={<LogoutRoundedIcon sx={{ fontSize: "30px" }} />}
                  onClick={() => {
                    localStorage.clear();
                    // toast("Đăng xuất thành công", "info");
                  }}
                  isCollasped={isCollasped}
                  sx={{
                    position: "absolute",
                    bottom: "50px",
                    width: "80%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F5F5F5",
                  }}
                />
              </Box>
            </Box>
          }
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
