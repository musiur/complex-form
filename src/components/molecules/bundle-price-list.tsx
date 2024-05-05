import { X } from "lucide-react";
import { useState } from "react";
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PriceListItem = {
  min_quantity: number;
  max_quantity: number;
  price: number;
};

const BundlePriceList = ({ form }: { form: any }) => {
  const [priceList, setPriceList] = useState<PriceListItem[]>([
    { min_quantity: 1, max_quantity: 10, price: 100 },
  ]);
  const [calculationType, setCalculationType] = useState("fixed");
  const [reducingAmount, setReducingAmount] = useState(10);
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
            value={reducingAmount}
            onChange={(e) => {
              if (e.target.value) {
                // @ts-ignore
                setReducingAmount(e.target.value);
              }
            }}
          />
        </div>
      </div>
      <table className="border [&>*]:text-center bg-white rounded-md">
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
            const dotNotation = `boundle_price_list[${index}]`;
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
                            placeholder="Image"
                            type="number"
                            value={priceList[index].min_quantity}
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
                            placeholder="Image"
                            type="number"
                            value={priceList[index].max_quantity}
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
                            placeholder="Image"
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
                  {index !== 0 ? <X className="stroke-pink-600" /> : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="w-full flex justify-end">
        <div
          className="p-2 border bg-white hover:bg-gray-200 active:bg-gray-300 rounded-md"
          role="button"
          onClick={() => {
            if (priceList.length < 4) {
              const lastPrice = priceList[priceList.length - 1];
              const newPriceItem = {
                min_quantity: lastPrice.max_quantity + 1,
                max_quantity:
                  lastPrice.max_quantity +
                  1 +
                  (lastPrice.max_quantity - lastPrice.min_quantity),
                price:
                  calculationType === "fixed"
                    ? lastPrice.price - reducingAmount
                    : lastPrice.price -
                      lastPrice.price * (reducingAmount / 100),
              };
              setPriceList([...priceList, newPriceItem]);
            }
          }}
        >
          Add
        </div>
      </div>
    </div>
  );
};

export default BundlePriceList;
