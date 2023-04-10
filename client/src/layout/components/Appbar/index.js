import { Box, IconButton, Typography, InputBase, Stack } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Avatar from "@mui/material/Avatar";
const Appbar = () => {
  return (
    <Box>
      <Box
        display="flex"
        bgcolor={"white"}
        borderRadius="10px 20px 20px 10px"
        height="37.95px"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row">
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
          <InputBase sx={{ ml: 2, width: "1218px" }} placeholder="Search" />
        </Stack>
        <Stack direction="row" alignItems={"center"} gap={1}>
          <NotificationsOutlinedIcon fontSize="large" />
          <InfoOutlinedIcon fontSize="large" />
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{
              height: "37.95px",
              width: "37.95px",
              borderRadius: "39.6252px;",
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default Appbar;
