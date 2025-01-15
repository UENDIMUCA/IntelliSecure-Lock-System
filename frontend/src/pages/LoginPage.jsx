'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';

// Validation schema for the form
const formSchema = z.object({
  username: z.string().nonempty({ message: 'Username is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (values) => {
    console.log(values);
    toast.success('Login successful!');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="w-full max-w-md">
        <Card className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
          <CardHeader className="mb-4 text-center">
            <CardTitle className="text-3xl font-bold text-gray-800">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Username Field */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field, error }) => (
                    <FormItem>
                      <FormLabel htmlFor="username" className="text-gray-600">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="username"
                          type="text"
                          placeholder="Enter your username"
                          autoComplete="username"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      {error && (
                        <FormMessage className="text-red-500 text-sm">
                          {error.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, error }) => (
                    <FormItem>
                      <FormLabel htmlFor="password" className="text-gray-600">
                        Password
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          id="password"
                          placeholder="********"
                          autoComplete="current-password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      {error && (
                        <FormMessage className="text-red-500 text-sm">
                          {error.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
