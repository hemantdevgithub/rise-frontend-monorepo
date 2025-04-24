import { useCreateLessonSegmentMutation } from "@/redux/features/lesson/lessonApi";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input, Label
} from "@repo/ui";
import { useState } from "react";
import { toast } from "sonner";

const CreateSegmentModalForm = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [mutation, { isLoading }] = useCreateLessonSegmentMutation();
  const onSubmit = async () => {
    if (name.length < 5) {
      toast.info("Segment name must be 5 char long!");
      return;
    }
    try {
      const response = await mutation({ title: name }).unwrap();
      if (response.success) {
        toast.success(response.message || "Segment created successfully!");
        setOpen(false);
        setName("");
      }
    } catch (error) {
      toast.error("Failed to create lesson segment!");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Segment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Lesson Segment</DialogTitle>
          <DialogDescription className="hidden">
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Segment Name</Label>
          <Input
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="eg. Basic"
            className="col-span-3"
          />
        </div>
        <DialogFooter>
          <Button type="button" onClick={onSubmit} disabled={isLoading}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSegmentModalForm;
