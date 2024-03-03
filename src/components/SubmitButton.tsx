"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-2" type="submit" disabled={pending}>
        {pending ? ( <Loader className="w-4 h-4 mr-2 animate-spin"/> ) : ('Submit')}
    </Button>
  );
};

export default SubmitButton;
