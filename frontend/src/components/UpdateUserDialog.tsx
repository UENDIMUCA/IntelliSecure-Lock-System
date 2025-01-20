import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Dispatch, SetStateAction} from "react";
import UserInfoForm from "@/components/UserInfoForm.tsx";
import {useMediaQuery} from "react-responsive";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {User} from "@/lib/types.ts";

interface DialogProp {
  refresh: () => void,
  user?: User
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function UpdateUserDialog({refresh, user, open, setOpen}: DialogProp) {
  const isDesktop = useMediaQuery({query: "(min-width: 768px)"})

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}>
          <DialogHeader>
            <DialogTitle>Update user {user?.username}</DialogTitle>
            <DialogDescription>
              Please update the form to edit this user
            </DialogDescription>
          </DialogHeader>
          <UserInfoForm
            refresh={refresh}
            setOpen={setOpen}
            user={user}
          />
        </DialogContent>
      </Dialog>
    )
  } else {
    return (
      <Drawer open={open} onOpenChange={setOpen} fadeFromIndex={undefined} snapPoints={[]}>
        <DrawerContent className={"px-2"}>
          <DrawerHeader className="text-left">
            <DrawerTitle>New user</DrawerTitle>
          </DrawerHeader>
          <UserInfoForm
            refresh={refresh}
            setOpen={setOpen}
            user={user}
            />
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