import {
  Dialog, DialogTitle, DialogContent, DialogContentText,
  DialogActions, Button
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

interface ConfirmDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  loading?: boolean;
}

const ReusableConfirmDeleteDialog = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  loading = false
}: ConfirmDeleteDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      PaperProps={{
        sx: { borderRadius: '12px', padding: '8px', width: '400px' }
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#d32f2f' }}>
        <WarningAmberIcon color="error" />
        {title}
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          {description}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ padding: '16px' }}>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={loading}
          autoFocus
          startIcon={<DeleteIcon />}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
        <Button
          onClick={onClose}
          disabled={loading}
          color="inherit"
          startIcon={<CloseIcon />}
          variant="outlined"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReusableConfirmDeleteDialog;