import { Box, Typography, Stack, Avatar } from "@mui/material";
const ArgLogBox = ({ name, role, updatedAt }) => {
  return (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Stack>
        <Typography
          fontSize={"20px"}
          fontWeight={500}
          lineHeight={"30px"}
          color="#121212"
        >
          {name}
        </Typography>
        <Typography
          fontSize={"14px"}
          fontWeight={500}
          lineHeight={"21px"}
          color="#94918A"
        >
          {role}
        </Typography>
      </Stack>
      <Typography
        fontSize={"17px"}
        fontWeight={500}
        lineHeight={"26px"}
        color="#121212"
      >
        {" "}
        {updatedAt}
      </Typography>
    </Box>
  );
};

export default ArgLogBox;
