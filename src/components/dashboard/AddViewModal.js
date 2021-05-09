import { useState } from "react";
import {
  Box,
  Container,
  Fade,
  Modal,
  Backdrop,
  Typography,
} from "@material-ui/core";

export default function AddViewModal({ addViewOpen, setAddViewOpen }) {
  return (
    <Modal
      open={addViewOpen}
      onClose={() => {
        setAddViewOpen(false);
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={addViewOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "5px",
            boxShadow: 24,
            p: 4,
            display: "grid",
            gap: "15px",
          }}
        >
          <Container maxWidth="sm">
            <form>
              <Box>
                <Typography color="textPrimary" variant="h4">
                  Add View
                </Typography>
              </Box>
            </form>
          </Container>
        </Box>
      </Fade>
    </Modal>
  );
}
