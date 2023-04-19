import { Stack } from "@mui/material";
import CamSection from "../../component/dManage/CamSection";
import FanSection from "../../component/dManage/FanSection";

const Manage = () => {
  return (
    <Stack margin={"100px 55px 1px 53.62px"} gap={"50px"}>
      <CamSection />
      <FanSection />
    </Stack>
  );
};

export default Manage;
