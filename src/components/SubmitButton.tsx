"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader, Loader2, Trash } from "lucide-react";
const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-2" type="submit" disabled={pending}>
        {pending ? ( <Loader className="w-4 h-4 mr-2 animate-spin"/> ) : ('Submit')}
    </Button>
  );
};

export function StripeSubscriptionCreationButton () {
 
  const {pending} = useFormStatus();
  return <>
  {
    pending? 
    (
      <Button disabled className="w-full">
        <Loader2 className="mr-2 w-4 h-4 animate-spin"/> Please wait
      </Button>
    ) 
    :
    (
      <Button type="submit" className="w-full">
        Buy Today
      </Button>
    )
  }
  </>
}

export function TrashDelete() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button variant={"destructive"} size="icon" disabled>
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button variant={"destructive"} size="icon" type="submit">
          <Trash className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}


export default SubmitButton;
