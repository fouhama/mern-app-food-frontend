import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../../components/ui/form";
import DetailsSections from "./DetailsSections";
import { Separator } from "../../components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";

const formShemca = z.object({
  restaurantName: z.string({
    required_error: "Restaurant Name is required",
  }),
  city: z.string({ required_error: " City is required" }),
  country: z.string(),
  deliveryPrice: z.coerce.number({
    required_error: "Delivery Price is required",
    invalid_type_error: " Delivery Price must be a number",
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "Estimated Delivery Time is required",
    invalid_type_error: "Estimated Delivery Time must be a number",
  }),
  cuisines: z
    .array(z.string())
    .nonempty({ message: "please Select at last items" }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, { message: "Name is required" }),
      price: z.coerce.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      }),
    })
  ),
  imageFile: z.instanceof(File, { message: "Please select an image" }),
});
type restaurantFromData = z.infer<typeof formShemca>;
// type Props = {
//   onSave: (restaurantFormData: FormData) => void;
//   isLoading: boolean;
// };
const Managerestaurantform = () => {
  const form = useForm<restaurantFromData>({
    resolver: zodResolver(formShemca),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });
  const onSubmit = () => {
    //  convert json to form data
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 bg-gray-50 p-10 rounded-lg flex-1'>
        <DetailsSections />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
      </form>
    </Form>
  );
};

export default Managerestaurantform;
