/* eslint-disable react-hooks/exhaustive-deps */
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PriceListItem = {
  min_quantity: number;
  max_quantity: number;
  price: number;
};

const BundlePriceList = ({ form, name }: { form: any; name: string }) => {
  const [priceList, setPriceList] = useState<PriceListItem[]>(
    form.getValues(name) || [{ min_quantity: 1, max_quantity: 10, price: 100 }]
  );
  const [calculationType, setCalculationType] = useState("fixed");
  const [reducingAmount, setReducingAmount] = useState(10);

  useEffect(() => {
    form.setValue(name, priceList);
  }, [priceList]);
  
  return (
    <div className="bg-blue-100 p-4 rounded-md space-y-4">
      <FormLabel>Price reduce level as quantity increase</FormLabel>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="space-y-2">
          <Select
            onValueChange={(value) => setCalculationType(value)}
            defaultValue={calculationType}
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
        </div>
        <div>
          <Input
            type="number"
            value={reducingAmount}
            max={priceList[priceList.length - 1].price}
            onChange={(e) => {
              if (e.target.value) {
                // @ts-ignore
                setReducingAmount(parseInt(e.target.value));
              }
            }}
          />
        </div>
      </div>
      <table
        className="border [&>*]:text-center bg-white"
        style={{ borderRadius: "10px" }}
      >
        <thead>
          <tr className="border-b">
            <th className="p-2 font-medium text-xs">Min Quantity</th>
            <th className="p-2 font-medium text-xs">Max Quantity</th>
            <th className="p-2 font-medium text-xs">Price</th>
            <th className="px-4">-</th>
          </tr>
        </thead>
        <tbody>
          {priceList.map((price: PriceListItem, index: number) => {
            const dotNotation = `bundle_price_list[${index}]`;
            const minName = dotNotation + ".min_quantity";
            const maxName = dotNotation + ".max_quantity";
            const priceName = dotNotation + ".price";
            return (
              <tr key={index}>
                <td>
                  <FormField
                    control={form.control}
                    // @ts-ignore
                    name={minName}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            value={priceList[index].min_quantity}
                            max={priceList[index].max_quantity - 1}
                            onChange={(e: any) => {
                              setPriceList(
                                priceList.map(
                                  (
                                    prevPrice: PriceListItem,
                                    mapIndex: number
                                  ) => {
                                    if (mapIndex === index) {
                                      return {
                                        ...prevPrice,
                                        min_quantity: parseInt(e.target.value),
                                      };
                                    } else {
                                      return prevPrice;
                                    }
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
                </td>
                <td>
                  <FormField
                    control={form.control}
                    // @ts-ignore
                    name={maxName}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            value={priceList[index].max_quantity}
                            min={priceList[index].min_quantity + 1}
                            onChange={(e: any) => {
                              setPriceList(
                                priceList.map(
                                  (
                                    prevPrice: PriceListItem,
                                    mapIndex: number
                                  ) => {
                                    if (mapIndex === index) {
                                      return {
                                        ...prevPrice,
                                        max_quantity: parseInt(e.target.value),
                                      };
                                    } else {
                                      return prevPrice;
                                    }
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
                </td>
                <td>
                  <FormField
                    control={form.control}
                    // @ts-ignore
                    name={priceName}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            value={priceList[index].price}
                            onChange={(e: any) => {
                              setPriceList(
                                priceList.map(
                                  (
                                    prevPrice: PriceListItem,
                                    mapIndex: number
                                  ) => {
                                    if (mapIndex === index) {
                                      return {
                                        ...prevPrice,
                                        price: parseInt(e.target.value),
                                      };
                                    } else {
                                      return prevPrice;
                                    }
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
                </td>
                <td>
                  {index !== 0 ? (
                    <X
                      className="stroke-pink-600"
                      role="button"
                      onClick={() => {
                        setPriceList(
                          priceList.filter(
                            (item, filterIndex: number) => filterIndex !== index
                          )
                        );
                      }}
                    />
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {priceList.length < 4 ? (
        <div className="w-full flex justify-end">
          <div
            className="p-2 border bg-white hover:bg-gray-200 active:bg-gray-300 rounded-md"
            role="button"
            onClick={() => {
              if (priceList.length < 4) {
                const lastPrice = priceList[priceList.length - 1];
                if (
                  lastPrice.max_quantity &&
                  lastPrice.min_quantity &&
                  lastPrice.price
                ) {
                  const newPriceItem = {
                    min_quantity: lastPrice.max_quantity + 1,
                    max_quantity:
                      lastPrice.max_quantity +
                      1 +
                      (lastPrice.max_quantity - lastPrice.min_quantity),
                    price: Math.floor(
                      calculationType === "fixed"
                        ? lastPrice.price - reducingAmount
                        : lastPrice.price -
                            lastPrice.price * (reducingAmount / 100)
                    ),
                  };
                  setPriceList([...priceList, newPriceItem]);
                }
              }
            }}
          >
            Add
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BundlePriceList;
