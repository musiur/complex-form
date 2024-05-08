import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const InputX = ({
  form,
  name,
  type,
  label,
}: {
  form: any;
  name: string;
  label: string;
  type: "text" | "textarea" | "number";
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              onChange={(e: any) => {
                form.setValue(name, type === "number" ? parseInt(e.target.value): e.target.value);
              }}
              value={form.watch(name) || ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputX;
