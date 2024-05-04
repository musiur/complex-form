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
  return (
    <div>
      <table className="border [&>*]:text-center">
        <thead>
          <tr className="border-b">
            <th className="px-2 font-medium">Min Quantity</th>
            <th className="px-2 font-medium">Max Quantity</th>
            <th className="px-2 font-medium">Price</th>
            <th></th>
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
                              priceList.map((prevPrice: PriceListItem) => {
                                return {
                                  ...prevPrice,
                                  min_quantity: parseInt(e.target.value),
                                };
                              })
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
                              priceList.map((prevPrice: PriceListItem) => {
                                return {
                                  ...prevPrice,
                                  max_quantity: parseInt(e.target.value),
                                };
                              })
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
                              priceList.map((prevPrice: PriceListItem) => {
                                return {
                                  ...prevPrice,
                                  price: parseInt(e.target.value),
                                };
                              })
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <td>
                  <X className="stroke-pink-600" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BundlePriceList;
