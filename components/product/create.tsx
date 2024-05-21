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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { Product } from "@/types/productType";
const FormDataSchema = z.object({
  title: z.string().min(3, { message: "Name must be at least 3 characters." }),
  description: z.string(),
  stock: z.number(),
  weight: z.number(),
  category: z.string(),
  price: z.number(),
});
type Inputs = z.infer<typeof FormDataSchema>;

const CreateProduct = ({
  categories,
  onSuccess,
  selectedProduct,
  setSelectedProduct,
}: {
  onSuccess: () => void;
  categories: Category[] | null;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
    defaultValues: {
      title: "",
      description: "",
      weight: 0,
      stock: 0,
      price: 0,
      category: "",
    },
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const payload = {
      ...data,
      ...(selectedProduct && { id: selectedProduct.id }),
    };
    try {
      setLoading(true);
      if (selectedProduct) {
        await axios.put(`/api/product`, { payload });
        await onSuccess();
        toast.success("Product updated successfully.");
        form.reset();
        return;
      }
      const response = await axios.post("/api/product", payload);
      await onSuccess();
      toast.success("Product created successfully.");
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
    if (open && selectedProduct) {
      form.reset({
        title: selectedProduct.name,
        description: selectedProduct.description,
        stock: selectedProduct.stock,
        weight: selectedProduct.weight,
        category: selectedProduct.categoryId,
        price: selectedProduct.price,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        weight: 0,
        stock: 0,
        price: 0,
        category: "",
      });
      setSelectedProduct(null);
    }
    setOpen(open);
  };

  useEffect(() => {
    if (selectedProduct) {
      onOpenChange(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default">Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription>Create a new Product.</DialogDescription>
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
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Product Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Price"
                      {...field}
                      {...form.register("price", {
                        required: true,
                        setValueAs: (value) => parseInt(value), // Convert input value to number
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Weight"
                      {...field}
                      {...form.register("weight", {
                        required: true,
                        setValueAs: (value) => parseInt(value), // Convert input value to number
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Stock"
                      {...field}
                      {...form.register("stock", {
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
                {selectedProduct ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProduct;
