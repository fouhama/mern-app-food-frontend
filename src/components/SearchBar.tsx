import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";
const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Search query is required",
  }),
});
export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeholder: string;
  onRest?: () => void;
  searchQuery?: string;
};

const SearchBar = ({ onSubmit, onRest, placeholder, searchQuery }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { searchQuery },
  });

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  const handleRest = () => {
    form.reset({
      searchQuery: "",
    });
    if (onRest) {
      onRest();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={` flex items-center rounded-full justify-between border-2 p-3 gap-3 flex-row ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}>
        <Search
          strokeWidth={2.5}
          size={30}
          className='ml-1 text-orange-500 hidden md:block'
        />
        <FormField
          control={form.control}
          name='searchQuery'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormControl>
                <Input
                  {...field}
                  className='border-none shadow-none focus-visible:ring-0'
                  placeholder={placeholder}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          onClick={handleRest}
          type='button'
          className='rounded-full '
          variant='outline'>
          Reset
        </Button>

        <Button className='bg-orange-500 rounded-full' type='submit'>
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
