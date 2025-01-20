import {useForm} from "react-hook-form";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "@/hooks/use-toast";
import {Dispatch, SetStateAction} from "react";
import {CreateUserSchema, User} from "@/lib/types.ts";
import {Checkbox} from "@/components/ui/checkbox.tsx";

interface FormProp {
  setOpen: Dispatch<SetStateAction<boolean>>,
  user ?: User
}

export default function UserInfoForm({setOpen, user = undefined} : FormProp) {
  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      username: user?.username ?? "",
      password: "",
      email: user?.email ?? "",
      uid: user?.uid ?? "",
      isTemporary: !!user?.beginDate,
      beginDate: user?.beginDate ?? undefined,
      endDate: user?.beginDate ?? undefined,
    }
  });

  const { watch } = form;
  const isUpdate = user !== undefined
  const isTemp = watch("isTemporary");

  async function onSubmit(values: z.infer<typeof CreateUserSchema>) {
    toast({description: "form submited"})
    console.log(values);
    setOpen(false);
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="username"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>E-Mail</FormLabel>
              <FormControl>
                <Input {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        {/* TODO : uid call back to be defined */}
        <FormField
          name="uid"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>UID</FormLabel>
              <FormControl>
                <Input {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          name="isTemporary"
          control={form.control}
          render={({field}) => (
            <FormItem className={"flex flex-row items-start space-x-3 space-y-0 my-2"}>
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
              </FormControl>
              <FormLabel>Is the user temporary</FormLabel>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          name="beginDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Begin Date</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isTemp}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="endDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isTemp}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type={"submit"} className={"mt-4 w-full md:w-auto"}>{isUpdate ? "Modifier" : "Créer"}</Button>
      </form>
    </Form>
  )
}