import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext();
  return (
    <div className='flex flex-row items-end gap-2'>
      <FormField
        name={`menuItems.${index}.name`}
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='flex items-center gap-2'>
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                className='bg-white'
                {...field}
                placeholder='cheese Pizza'
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name={`menuItems.${index}.price`}
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='flex items-center gap-2'>
              Price($) <FormMessage />
            </FormLabel>
            <FormControl>
              <Input className='bg-white' {...field} placeholder='8.00' />
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        type='button'
        onClick={removeMenuItem}
        className='bg-red-500 max-h-fit'>
        Remove
      </Button>
    </div>
  );
};

export default MenuItemInput;
