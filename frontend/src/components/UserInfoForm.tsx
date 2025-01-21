import {useForm} from "react-hook-form";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "@/hooks/use-toast";
import {Dispatch, SetStateAction} from "react";
import {CreateUserSchema, UpdateUserQuery, User} from "@/lib/types.ts";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import apiClient from "@/lib/apiClient.ts";
import {PopoverDialog, PopoverContent, PopoverTrigger} from "@/components/ui/popoverDialog";
import {cn, getLoggedUser} from "@/lib/utils.ts";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar.tsx";

interface FormProp {
  refresh: () => void,
  setOpen: Dispatch<SetStateAction<boolean>>,
  user ?: User
}

export default function UserInfoForm({refresh, setOpen, user = undefined} : FormProp) {
  const isUpdate = user !== undefined
  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      username: user?.username ?? "",
      password: isUpdate ? "password_dumb" : "",
      email: user?.email ?? "",
      uid: user?.uid ?? "",
      isTemporary: !!user?.beginDate,
      beginDate: user?.beginDate ? new Date(user.beginDate) : undefined,
      endDate: user?.beginDate ? new Date(user.endDate) : undefined,
    }
  });

  const { watch } = form;
  const isTemp = watch("isTemporary");

  async function onSubmit(values: z.infer<typeof CreateUserSchema>) {
    if (isUpdate) {
      const formattedValues = {
        ...values,
        beginDate: values.beginDate ? values.beginDate.toISOString() : null,
        endDate: values.endDate ? values.endDate.toISOString() : null,
      } as UpdateUserQuery;
      delete formattedValues.password;
      apiClient.put(`/api/users/${user?.id}`, formattedValues)
        .then((res) => {
          toast({description: `User ${res.data.username} updated`});
          refresh();
          if (res.data.id == getLoggedUser()?.id) {
            localStorage.setItem("user", JSON.stringify(res.data));
          }
        })
        .catch((err) => {
          console.log(err);
          toast({description: "Something went wrong", variant: "destructive"});
        });
    } else {
      const formattedValues = {
        ...values,
        beginDate: values.beginDate ? values.beginDate.toISOString() : null,
        endDate: values.endDate ? values.endDate.toISOString() : null,
      };
      apiClient.post(`/api/users`, formattedValues)
        .then(() => {
          toast({description: "User created"});
          refresh();
        })
        .catch((err) => {
          console.log(err);
          toast({description: "Something went wrong", variant: "destructive"});
        });
    }
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

        {!isUpdate ?
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
          : undefined
        }


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
          control={form.control}
          name="beginDate"
          render={({ field }) => (
            <FormItem className="flex flex-col py-2">
              <FormLabel>Begin date</FormLabel>
              <PopoverDialog>
                <PopoverTrigger asChild disabled={!isTemp}>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={!isTemp}
                    >
                      {field.value ? (
                        field.value.toLocaleDateString()
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0,0,0,0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </PopoverDialog>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col py-2">
              <FormLabel>End date</FormLabel>
              <PopoverDialog>
                <PopoverTrigger asChild disabled={!isTemp}>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={!isTemp}
                    >
                      {field.value ? (
                        field.value.toLocaleDateString()
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0,0,0,0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </PopoverDialog>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type={"submit"} className={"mt-4 w-full md:w-auto"}>{isUpdate ? "Update" : "Create"}</Button>
      </form>
    </Form>
  )
}