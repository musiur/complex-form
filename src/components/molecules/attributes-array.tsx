/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import AttributeValues from "./attributes-values";
import { X } from "lucide-react";

type TAttribute = { label: string; type: string; values: string[] };

const AttributesArray = ({
  form,
  defaultValues,
}: {
  form: any;
  defaultValues?: TAttribute[];
}) => {
  const [attributes, setAttributes] = useState<TAttribute[]>(
    defaultValues || []
  );
  const [showAddButton, setShowAddButton] = useState(false);

  useEffect(() => {
    form.setValue(`attributes`, attributes);
  }, [attributes]);

  // console.log(attributes);

  useEffect(() => {
    const lastAttribute = attributes[attributes.length - 1];
    if (
      lastAttribute.label &&
      lastAttribute.type &&
      lastAttribute.values.length
    ) {
      setShowAddButton(true);
    } else {
      setShowAddButton(false);
    }
  }, [attributes]);

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {attributes.length
          ? attributes.map((attribute: TAttribute, index: number) => {
              const dotNotation = `attributes[${index}]`;
              const labelName = dotNotation + ".label";
              const typeName = dotNotation + ".type";

              return (
                <fieldset
                  key={index}
                  className="space-y-4 p-4 border shadow-lg rounded-lg relative group"
                >
                  {attributes.length > 1 ? (
                    <div className="absolute top-[4px] right-[4px] p-[4px] border cursor-pointer ml-[4px] rounded-full group-hover:border-pink-600 group-hover:bg-pink-600 transition-all duration-200">
                      <X
                        className="w-4 h-4 group-hover:stroke-white transition-all duration-200"
                        onClick={() => {
                          setAttributes(
                            attributes.filter(
                              (currentAttribute: TAttribute) =>
                                currentAttribute.label !== attribute.label
                            )
                          );
                        }}
                      />
                    </div>
                  ) : null}
                  <FormField
                    control={form.control}
                    // @ts-ignore
                    name={labelName}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Attribute label</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Image"
                            // @ts-ignore
                            value={attributes[index].label}
                            onChange={(e: any) => {
                              setAttributes(
                                attributes.map(
                                  (currentAttribute: TAttribute) => {
                                    if (
                                      currentAttribute.label === attribute.label
                                    ) {
                                      return {
                                        ...currentAttribute,
                                        label: e.target.value,
                                      };
                                    }
                                    return currentAttribute;
                                  }
                                )
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    // @ts-ignore
                    name={typeName}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Attribute Types</FormLabel>
                        <FormControl>
                          <Input
                            // placeholder="Image"
                            // @ts-ignore
                            value={attributes[index].type}
                            onChange={(e: any) => {
                              setAttributes(
                                attributes.map(
                                  (currentAttribute: TAttribute) => {
                                    if (
                                      currentAttribute.label === attribute.label
                                    ) {
                                      return {
                                        ...currentAttribute,
                                        type: e.target.value,
                                      };
                                    }
                                    return currentAttribute;
                                  }
                                )
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <AttributeValues
                    form={form}
                    attributeIndex={index}
                    defaultValues={attributes[index].values}
                    handler={(values: string[]) => {
                      setAttributes(
                        attributes.map((currentAttribute: TAttribute) => {
                          if (currentAttribute.label === attribute.label) {
                            return {
                              ...currentAttribute,
                              values,
                            };
                          }
                          return currentAttribute;
                        })
                      );
                    }}
                  />
                </fieldset>
              );
            })
          : null}
      </div>
      {showAddButton ? (
        <div
          onClick={() => {
            setAttributes([
              ...attributes,
              {
                label: "",
                type: "",
                values: [],
              },
            ]);
          }}
          className="h-12 flex items-center justify-center w-[200px] border bg-gray-200 hover:bg-gray-600 active:bg-gray-400 rounded-md hover:text-white"
          role="button"
        >
          Add A New Attribute
        </div>
      ) : null}
    </div>
  );
};

export default AttributesArray;
