import Appbar from "../components/Appbar";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Box display="flex" height="100vh" backgroundColor="rgb(236,236,238)">
        <Sidebar />
        <Box
          width={"100%"}
          backgroundColor="#F5F5F5"
          sx={{ overflowY: "scroll" }}
        >
          <Box
            margin={"25px 71px 17.05px 33.62px "}
            width={"calc(100% - 33.62px -17.05px)"}
          >
            <Appbar />
          </Box>
          <Box>{children}</Box>
        </Box>
      </Box>
    </div>
  );
};

export default DefaultLayout;
