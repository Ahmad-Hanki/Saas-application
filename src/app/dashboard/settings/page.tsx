import SubmitButton from "@/components/SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import prisma from "@/db/client";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
async function getData(userId: string) {
  const data = await prisma?.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      colorScheme: true,
    },
  });

  return data;
}

const Settings = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);

  const postData = async (formData: FormData) => {
    "use server";
    await prisma?.user.update({
      where: {
        id: user?.id,
      },
      data: {
        name: (formData.get("name") as string) ?? undefined,
        colorScheme: (formData.get("color") as string) ?? undefined,
      },
    });

    revalidatePath('/', "layout");
  };

  return (
    <div className="grid items-start gap-8">
      <div className="items-center flex justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-xl ">Settings</h1>
          <p className="text=lg text-muted-foreground">Your Profile Settings</p>
        </div>
      </div>

      <Card>
        <form action={postData}>
          <CardHeader>
            <CardTitle>General Data </CardTitle>

            <CardDescription>
              Please provide general infos. Please dont forget to save
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 ">
              <div className="space-y-1">
                <Label>Your name</Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="your name"
                  id="name"
                  defaultValue={data?.name ?? undefined}
                />
              </div>
              <div className="space-y-1">
                <Label>Your Email</Label>
                <Input
                  name="email"
                  type="text"
                  placeholder="your email"
                  id="email"
                  disabled
                  defaultValue={user?.email as string}
                />
              </div>

              <div className="space-y-2">
                <Label>Color Scheme</Label>
                <Select name="color" defaultValue={data?.colorScheme as string}>
                  <SelectTrigger className="w-1/2">
                    <SelectValue placeholder="Select a Color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Color</SelectLabel>
                      <SelectItem value="theme-green">Green</SelectItem>
                      <SelectItem value="theme-blue">Blue</SelectItem>
                      <SelectItem value="theme-yellow">Yellow</SelectItem>
                      <SelectItem value="theme-orange">Orange</SelectItem>
                      <SelectItem value="theme-red">Red</SelectItem>
                      <SelectItem value="theme-rose">Rose</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                  <CardFooter>
                     <SubmitButton />  {/* button submit */}
                  </CardFooter>
                </Select>
              </div>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};


export default Settings;
