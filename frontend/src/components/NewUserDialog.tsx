import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import {PlusCircle} from "lucide-react";
import {useState} from "react";
import UserInfoForm from "@/components/UserInfoForm.tsx";
import {useMediaQuery} from "react-responsive";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";

interface DialogProp {
  refresh: () => void
}

export default function NewUserDialog({refresh}: DialogProp) {
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery({query: "(min-width: 768px)"})

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button><PlusCircle className="mr-1"/>Add a new user</Button>
        </DialogTrigger>
        <DialogContent className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}>
          <DialogHeader>
            <DialogTitle>New user</DialogTitle>
            <DialogDescription>
              Please fill the form to create a new user
            </DialogDescription>
          </DialogHeader>
          <UserInfoForm
            refresh={refresh}
            setOpen={setOpen}/>
        </DialogContent>
      </Dialog>
    )
  } else {
    return (
      <Drawer open={open} onOpenChange={setOpen} fadeFromIndex={undefined} snapPoints={[]}>
        <DrawerTrigger asChild>
          <Button><PlusCircle className="mr-1"/>Add a new user</Button>
        </DrawerTrigger>
        <DrawerContent className={"px-2"}>
          <DrawerHeader className="text-left">
            <DrawerTitle>New user</DrawerTitle>
          </DrawerHeader>
          <UserInfoForm
            refresh={refresh}
            setOpen={setOpen}/>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }
}