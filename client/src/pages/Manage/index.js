import { Stack } from "@mui/material";
import CamSection from "../../component/dManage/CamSection";
import FanSection from "../../component/dManage/FanSection";
import TempSection from "../../component/dManage/TempSection";
import HumiSection from "../../component/dManage/HumiSection";
import LightSection from "../../component/dManage/LightSection";
import PumpSection from "../../component/dManage/PumpSection";
import BurglarSection from "../../component/dManage/BurglarSection";

const Manage = () => {
  return (
    <Stack margin={"100px 55px 1px 53.62px"} gap={"50px"} pb={"100px"}>
      <CamSection />
      <FanSection />
      <Stack direction={"row"} gap={10}>
        <TempSection />
        <HumiSection />
        <LightSection />
      </Stack>
      <Stack direction={"row"} gap={10}>
        <PumpSection />
        <BurglarSection />
      </Stack>
    </Stack>
  );
};

export default Manage;
