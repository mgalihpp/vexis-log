import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteTrade } from "@/utils/dashboard.functions";
import { useFeedbackToast } from "@/hooks/use-feedback-toast";

type Props = {
  id: string;
  open: boolean;
  onClose: () => void;
};

export const DeleteTradeDialog = ({ id, open, onClose }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { showToast } = useFeedbackToast();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await deleteTrade({ data: { id } });
      router.refresh();
      onClose();
      showToast("success", "Trade deleted successfully.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete trade";
      showToast("error", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Trade Log</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this trade log? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
