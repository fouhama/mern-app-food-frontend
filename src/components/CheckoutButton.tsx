import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "../forms/user-profile-form/UserProfileForm";
import { UseGetCurrentUser } from "../api/MyUserApi";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
};

const CheckoutButton = ({ onCheckout, disabled }: Props) => {
  const { currentUser, isLoading: isLoadingGetUser } = UseGetCurrentUser();
  const {
    isLoading: isAuthLoading,
    loginWithRedirect,
    isAuthenticated,
  } = useAuth0();
  const { pathname } = useLocation();
  const onlogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={onlogin} className='bg-orange-500 flex-1'>
        Log in to check out
      </Button>
    );
  }

  if (isAuthLoading || !currentUser) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className='bg-orange-500 flex-1'>
          Go to check out
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-gray-50 max-w-[425px] md:min-w-[700px]'>
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isLoadingGetUser}
          title='Confirem Delivery Details'
          btnText='Continue to payment'
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
