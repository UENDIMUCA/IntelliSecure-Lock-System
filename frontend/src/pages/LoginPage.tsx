import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {useNavigate, useSearchParams} from "react-router-dom";
import apiClient from "@/lib/apiClient.ts";
import {toast} from "@/hooks/use-toast.ts";
import {useEffect} from "react";
const loginFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    for (const entry of searchParams.entries()) {
      if(entry[0] === "token") {
        const body = {token: entry[1]};
        apiClient.post('api/auth/check_qr_token', body)
          .then((response) => {
            console.log(response);
            toast({description: "QR has been flashed, please login to continue"})
          })
          .catch((error) => {
            console.log(error);
            toast({description: "An error occurred. Please try again.", variant: "destructive"});
          })
        console.log("token detected");
      }
    }
  }, [searchParams])

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },

  });

  const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
    apiClient.post(`/api/auth/login/`, values)
        .then((res) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate('/dashboard');
        })
        .catch((err)=> {
          if (err.status === 403) {
            toast({title: "This user isn't active yet !", description: "Please refer to your administrator." , variant: "destructive"});
          } else {
            form.setError('password', {type: 'error', message: 'Username or password is incorrect'});
            form.setError('username', {type: 'error', message: 'Username or password is incorrect'});
          }
        });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your credentials below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full">Sign in</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default LoginPage;
