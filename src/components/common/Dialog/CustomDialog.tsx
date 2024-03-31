import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface CustomDialog {
  title?: string;
  content: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  onAgree: () => void;
}

export function CustomDialog(props: CustomDialog) {
  const { title, content, open, setOpen, onAgree } = props;

  const handleClose = (agree: boolean = false) => {
    if (agree) onAgree();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent id="alert-dialog-description">{content}</DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => handleClose()}>Cancel</Button>
        <Button color="error" onClick={() => handleClose(true)} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
