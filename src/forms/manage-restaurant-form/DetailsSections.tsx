import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";

function DetailsSections() {
  const { control } = useFormContext();
  return (
    <div className='space-y-2'>
      <div>
        <h2 className='text-2xl font-bold'>Details</h2>
        <FormDescription>
          Enter the details about your restaurant
        </FormDescription>
      </div>
      <FormField
        name='restaurantName'
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} className='bg-white' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className='flex gap-4'>
        <FormField
          name='city'
          control={control}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} className='bg-white' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='country'
          control={control}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} className='bg-white' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        name='deliveryPrice'
        control={control}
        render={({ field }) => (
          <FormItem className='max-w-[25%]'>
            <FormLabel>Delivery Price ($)</FormLabel>
            <FormControl>
              <Input {...field} className='bg-white' placeholder='12.5' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name='estimatedDeliveryTime'
        control={control}
        render={({ field }) => (
          <FormItem className='max-w-[25%]'>
            <FormLabel>Estimated Delivery Time (munites)</FormLabel>
            <FormControl>
              <Input {...field} className='bg-white' placeholder='30' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default DetailsSections;
