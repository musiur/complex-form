/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import { useEffect, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
// @ts-ignore
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditorX = ({
  form,
  name,
  label,
}: {
  form: any;
  name: string;
  label: string;
}) => {
  const [value, setValue] = useState(form.watch(name) || "");

  useEffect(() => {
    if (value) {
      form.setValue(name, value);
    }
  }, [value]);

  useEffect(() => {
    setValue(form.watch(name));
  }, [form.watch(name)]);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <ReactQuill theme="snow" value={value} onChange={setValue} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EditorX;
