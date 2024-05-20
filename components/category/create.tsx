import { Category } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Select, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
const FormDataSchema = z.object({
  title: z.string().min(3, { message: "Name must be at least 3 characters." }),
  description: z.string(),
  position: z.number(),
});
type Inputs = z.infer<typeof FormDataSchema>;

const CreateCategory = ({
  onSuccess,
  selectedCategory,
  setSelectedCategory,
}: {
  onSuccess: () => void;
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
    defaultValues: {
      title: "",
      description: "",
      position: 0,
    },
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const payload = {
      ...data,
      ...(selectedCategory && { id: selectedCategory.id }),
    };
    try {
      setLoading(true);
      if (selectedCategory) {
        await axios.put(`/api/category`, { payload });
        await onSuccess();
        toast.success("Category updated successfully.");
        form.reset();
        return;
      }
      const response = await axios.post("/api/category", payload);
      await onSuccess();
      toast.success("Category created successfully.");
      form.reset();
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
      onOpenChange(false);
    }
  };

  const onOpenChange = (open: boolean) => {
    if (open && selectedCategory) {
      form.reset({
        title: selectedCategory.title,
        description: selectedCategory.description,
        position: selectedCategory.position,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        position: 0,
      });
      setSelectedCategory(null);
    }
    setOpen(open);
  };

  useEffect(() => {
    if (selectedCategory) {
      onOpenChange(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default">Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>
            Create a new category for your store.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processForm)} className="space-y-8">
            <div className="flex justify-between gap-2"></div>
            <FormField
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Title"
                      {...field}
                      {...form.register("title", { required: true })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Description"
                      {...field}
                      {...form.register("description", { required: true })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Position"
                      {...field}
                      {...form.register("position", {
                        required: true,
                        setValueAs: (value) => parseInt(value), // Convert input value to number
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={loading} type="submit">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {selectedCategory ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategory;
