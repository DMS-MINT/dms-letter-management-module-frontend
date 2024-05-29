"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { setLetterType, resetState, setUserOptions } from "@/redux/slices";
import {
  InternalLetterForm,
  IncomingLetterForm,
  OutgoingLetterForm,
} from "@/widgets/compose/composeForms";
import { useDispatch } from "react-redux";
import { IUserOptions, UserApiInputSerializer } from "@/typing";
import axios from "axios";
import { useEffect } from "react";

export default function Compose() {
  const dispatch = useDispatch();

  const API_URL = "http://35.158.66.17:9000/api/users/";
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = transformApiResponse(response.data);
        console.log(data);
        dispatch(setUserOptions(data));
      } catch (error) {
        console.error("Error fetching user options:", error);
        throw error;
      }
    };

    const transformApiResponse = (
      apiResponse: UserApiInputSerializer[]
    ): IUserOptions[] => {
      return apiResponse.map((item) => {
        let label: string;

        if (item.user_type === "member") {
          label = item.job_title || item.full_name.trim();
        } else {
          label = item.name;
        }

        return {
          value: item.id,
          label: label,
          user_type: item.user_type,
        };
      });
    };
    fetchUsers();
  }, []);

  return (
    <Tabs defaultValue="internal letter form" className="h-full flex flex-col">
      <TabsList className="w-fit">
        <TabsTrigger
          value="internal letter form"
          onClick={() => {
            dispatch(resetState());
            dispatch(setLetterType("internal"));
          }}
        >
          የውስጥ ደብዳቤ
        </TabsTrigger>
        <TabsTrigger
          value="outgoing letter form"
          onClick={() => {
            dispatch(resetState());
            dispatch(setLetterType("outgoing"));
          }}
        >
          ወደ ውጪ የሚላክ ደብዳቤ
        </TabsTrigger>
        <TabsTrigger
          value="incoming letter form"
          onClick={() => {
            dispatch(resetState());
            dispatch(setLetterType("incoming"));
          }}
        >
          ከውጭ የተላከ ደብዳቤ
        </TabsTrigger>
      </TabsList>
      <TabsContent value="internal letter form" className="flex-1">
        <InternalLetterForm />
      </TabsContent>
      <TabsContent value="incoming letter form" className="flex-1">
        <IncomingLetterForm />
      </TabsContent>
      <TabsContent value="outgoing letter form" className="flex-1">
        <OutgoingLetterForm />
      </TabsContent>
    </Tabs>
  );
}
