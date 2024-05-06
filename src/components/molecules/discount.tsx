/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const Discount = ({ form, name }: { form: any; name: string }) => {
  const typeName = name + ".discountType";
  const valueName = name + ".value";

  return (
    <fieldset className="p-4 border rounded-md shadow-lg">
      <FormField
        control={form.control}
        // @ts-ignore
        name={valueName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Discount Type</FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => form.setValue(typeName, value)}
                defaultValue={typeName}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="fixed">Fixed</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        // @ts-ignore
        name={valueName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Discount Value</FormLabel>
            <FormControl>
              <Input
                type="number"
                // @ts-ignore
                value={form.getValues(
                  // @ts-ignore
                  valueName
                )}
                onChange={(e: any) => {
                  form.setValue(
                    // @ts-ignore
                    valueName,
                    parseInt(e.target.value)
                  );
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </fieldset>
  );
};

export default Discount;
