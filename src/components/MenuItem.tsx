import { MenuItem } from "../../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuItem: MenuItem;
  addTocard: () => void;
};

const MenuItems = ({ menuItem, addTocard }: Props) => {
  return (
    <Card className='cursor-pointer' onClick={addTocard}>
      <CardHeader>
        <CardTitle> {menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className='font-bold'>
        {(menuItem.price / 100).toFixed(2)}
      </CardContent>
    </Card>
  );
};

export default MenuItems;
