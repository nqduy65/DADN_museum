import { Stack } from "@mui/material";
import CamSection from "../../component/dManage/CamSection";
import FanSection from "../../component/dManage/FanSection";
import TempBox from "../../component/dManage/TempBox";
import TempSection from "../../component/dManage/TempSection";
import HumiSection from "../../component/dManage/HumiSection";

const Manage = () => {
  return (
    <Stack margin={"100px 55px 1px 53.62px"} gap={"50px"} pb={"100px"}>
      <CamSection />
      <FanSection />
      <Stack direction={"row"} gap={10}>
        <TempSection />
        <HumiSection />
      </Stack>
    </Stack>
  );
};

export default Manage;
