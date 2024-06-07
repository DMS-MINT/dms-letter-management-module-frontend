"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  login,
  selectStatus,
  selectIsAuthenticated,
  getUserProfile,
} from "@/lib/features/authentication/authSlice";
import { ICredentials, RequestStatusEnum } from "@/typing";
import { redirect } from "next/navigation";

export default function SignIn() {
  const [formData, setFormData] = useState<ICredentials>({
    email: "",
    password: "",
  });
  const status = useAppSelector(selectStatus);
  const is_authenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (is_authenticated) {
      redirect("/letters/index");
      dispatch(getUserProfile({}));
    }
  }, [is_authenticated]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(login(formData));
  };

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
      <form className="flex flex-col gap-5 ">
        <div className="grid items-center gap-1.5">
          <Label htmlFor="email">የኢሜይል አድራሻዎን ያስገቡ</Label>
          <Input
            required
            disabled={status === RequestStatusEnum.LOADING ? true : false}
            name="email"
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => onChange(e)}
          />
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
            disabled={status === RequestStatusEnum.LOADING ? true : false}
            name="password"
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <Button
          disabled={status === RequestStatusEnum.LOADING ? true : false}
          variant="secondary"
          className="flex gap-2 items-center w-full"
          onClick={(e) => onSubmit(e)}
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
