import { Box, Typography, Stack, Avatar } from "@mui/material";
const ArgNotiMess = ({ feed, updatedAt, content }) => {
  return (
    <Stack width={"95%"} gap={3}>
      <Box display="flex" alignItems={"center"} gap={1}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />{" "}
        <Stack>
          <Typography fontSize={"14px"} lineHeight={"19px"} fontWeight={600}>
            {feed}
          </Typography>
          <Typography
            fontWeight={600}
            fontSize={"11px"}
            lineHeight={"18px"}
            color={"rgba(211, 211, 211, 1)"}
          >
            {updatedAt}
          </Typography>
        </Stack>
      </Box>
      <Typography
        fontWeight={400}
        lineHeight={"18px"}
        fontSize={"13px"}
        sx={{ alignSelf: "flex-end", marginRight: "10%" }}
      >
        {content}
      </Typography>
    </Stack>
  );
};

export default ArgNotiMess;
