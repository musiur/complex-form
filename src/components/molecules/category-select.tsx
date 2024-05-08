import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const CategorySelect = ({ form }: { form: any }) => {
  const [categories, setCategories] = useState([
    { label: "Cloth", value: "663162fc9375454f7bf13440" },
  ]);
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {categories?.map(
                (category: { label: string; value: string }, index: number) => {
                  const { label, value } = category;
                  return (
                    <SelectItem key={index} value={value}>
                      {label}
                    </SelectItem>
                  );
                }
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CategorySelect;
