import { useState } from "react";
import { useForm } from "react-hook-form";
import { Edit, Loader2, Save, X } from "lucide-react";
import type { DefaultValues, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useFeedbackToast } from "@/hooks/use-feedback-toast";
import type {
  TradeFormInput,
  TradeFormValues,
} from "@/utils/schema/tradeSchema";

interface EditableSectionProps {
  title: string;
  icon: React.ElementType;
  defaultValues: DefaultValues<TradeFormInput>;
  renderView: () => React.ReactNode;
  renderEdit: (
    form: UseFormReturn<TradeFormInput, unknown, TradeFormValues>,
  ) => React.ReactNode;
  onSave: (data: TradeFormValues) => Promise<void>;
  className?: string;
}

export function EditableSection({
  title,
  icon: Icon,
  defaultValues,
  renderView,
  renderEdit,
  onSave,
  className,
}: EditableSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useFeedbackToast();

  const form = useForm<TradeFormInput, unknown, TradeFormValues>({
    defaultValues,
  });

  const handleSave = async (data: TradeFormValues) => {
    setIsSaving(true);
    try {
      await onSave(data);
      setIsEditing(false);
      // Reset form with new values (handled by parent re-render usually, but good to reset to be sure)
      form.reset(data);
    } catch (error) {
      console.error(error);
      showToast("error", "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.reset(defaultValues);
  };

  return (
    <section className={className}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-primary">
          {/* <Icon className="h-4 w-4" />*/}
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        {!isEditing ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="h-8 px-2 text-muted-foreground hover:text-primary"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        ) : (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              disabled={isSaving}
              className="h-8 px-2 text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={form.handleSubmit(handleSave)}
              disabled={isSaving}
              className="h-8 px-3"
            >
              {isSaving ? (
                <Loader2 className="h-3 w-3 animate-spin mr-1" />
              ) : (
                <Save className="h-3 w-3 mr-1" />
              )}
              Save
            </Button>
          </div>
        )}
      </div>

      <div className="animate-in fade-in duration-300">
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)}>
              {renderEdit(form)}
            </form>
          </Form>
        ) : (
          renderView()
        )}
      </div>
    </section>
  );
}
