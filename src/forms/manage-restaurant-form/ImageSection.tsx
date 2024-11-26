import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { AspectRatio } from "../../components/ui/aspect-ratio";

const ImageSection = () => {
  const { control, watch } = useFormContext();
  const existingImage = watch("imageUrl");
  return (
    <div className='space-y-2'>
      <div>
        <h2 className='text-2xl font-bold'>Image</h2>
        <FormDescription>
          Add a image that will be displayed on your restaurant listing in the
          search results, Adding a new Image will overwrite the existing one
        </FormDescription>
      </div>
      <div className='flex flex-col gap-8 md:w-[50%]'>
        {existingImage && (
          <AspectRatio ratio={16 / 9}>
            <img src={existingImage} alt='image' />
          </AspectRatio>
        )}
        <FormField
          name='imageFile'
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type='file'
                  className='bg-white'
                  accept='.png, .jpeg, .jpg'
                  onChange={(event) =>
                    field.onChange(
                      event.target.files ? event.target.files[0] : null
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ImageSection;
