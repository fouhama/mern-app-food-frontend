import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../../components/ui/form";
import DetailsSections from "./DetailsSections";
import { Separator } from "../../components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "../../components/LoadingButton";
import { Button } from "../../components/ui/button";
import { Restaurant } from "../../../types";
import { useEffect } from "react";

const formShemca = z
  .object({
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
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Please select an image" }),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image url or image file must be provided",
    path: ["imageFile"],
  });
type RestaurantFromData = z.infer<typeof formShemca>;
type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
  restaurant?: Restaurant;
};
const Managerestaurantform = ({ restaurant, isLoading, onSave }: Props) => {
  const form = useForm<RestaurantFromData>({
    resolver: zodResolver(formShemca),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    }
    const deliveryPriceFromatted = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2)
    );
    const menuItemsFormatted = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));

    const updateRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFromatted,
      menuItems: menuItemsFormatted,
    };
    form.reset(updateRestaurant);
  }, [form, restaurant]);

  const onSubmit = (formDataJson: RestaurantFromData) => {
    //  convert json to form data
    const formData = new FormData();
    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });
    if (formDataJson.imageFile) {
      formData.append("imageFile", formDataJson.imageFile);
    }
    onSave(formData);
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
        <Separator />
        <ImageSection />

        {isLoading ? <LoadingButton /> : <Button type='submit'>Submit</Button>}
      </form>
    </Form>
  );
};

export default Managerestaurantform;
