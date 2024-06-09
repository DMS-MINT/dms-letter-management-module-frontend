"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  login,
  selectIsAuthenticated,
} from "@/lib/features/authentication/authSlice";
import { ICredentials } from "@/typing/interface";
import { redirect } from "next/navigation";
import * as yup from "yup";
import { useFormik, FormikHelpers } from "formik";

export default function SignIn() {
  const is_authenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();

  const onSubmit = async (
    values: ICredentials,
    actions: FormikHelpers<ICredentials>
  ) => {
    await dispatch(login(values));
    actions.resetForm();
  };

  const authSchema = yup.object().shape({
    email: yup
      .string()
      .email("እባክዎ ትክክለኛ ኢሜይል ያስገቡ")
      .required("እባክዎ የኢሜል አድራሻዎን ያስገቡ"),
    password: yup.string().required("እባክዎ የይለፍ ቃሎን ያስገቡ"),
  });

  const { values, errors, touched, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: authSchema,
      onSubmit,
    });

  useEffect(() => {
    if (is_authenticated) {
      redirect("/letters/inbox");
    }
  }, [is_authenticated]);

  return (
    <section className="flex flex-col gap-7">
      <div>
        <h2 className="text-gray-900 font-medium text-xl mt-5 mb-2">
          እንኳን ደህና መጡ!
        </h2>
        <p className="text-gray-700 font-light text-sm">
          እባክዎ ለመግባት የተጠቃሚ መለያዎን እና የይለፍ ቃልዎን ያስገቡ።
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
        <div className="grid items-center gap-1.5">
          <Label htmlFor="email">የኢሜይል አድራሻዎን ያስገቡ</Label>
          <Input
            required
            disabled={isSubmitting}
            name="email"
            type="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            className={
              errors.email && touched.email
                ? "border border-red-500 focus-visible:ring-1 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                : ""
            }
          />
          {errors.email && touched.email && (
            <p className="font-light text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="grid items-center gap-1.5">
          <div className="flex justify-between items-center h-fit">
            <Label htmlFor="password">የይለፍ ቃልዎን ያስገቡ</Label>
            <Link href="/forgot-password">
              <Button variant="link" className="py-0 h-fit">
                የይለፍ ቃልዎን ረስተዋል?
              </Button>
            </Link>
          </div>
          <Input
            required
            readOnly={isSubmitting}
            name="password"
            type="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            className={
              errors.password && touched.password
                ? "border border-red-500 focus-visible:ring-1 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                : ""
            }
          />
          {errors.password && touched.password && (
            <p className="font-light text-red-500">{errors.email}</p>
          )}
        </div>
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="secondary"
          className="flex gap-2 items-center w-full"
        >
          <LogIn size={20} />
          ግባ
        </Button>
      </form>
      <div className="flex gap-2 items-center self-center">
        <p className="text-gray-800">የቴክኒክ ድጋፍ ለማግኘት </p>
        <Button variant="link" className="p-0 h-fit text-base">
          እኛን ያነጋግሩን
        </Button>
      </div>
    </section>
  );
}
