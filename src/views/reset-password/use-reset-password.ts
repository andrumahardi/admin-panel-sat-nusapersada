import { useReducer, ChangeEvent, FormEvent, useState } from "react";
import { reducer, initialState, ACTION_TYPES } from "./reset-password-reducer";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { URLS } from "@/constants";

let timeout: NodeJS.Timeout | null = null;

export function useResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const toast = useToast();
  const router = useRouter();

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: ACTION_TYPES.CHANGE_FIELD,
      name: e.target.name as "email",
      value: e.target.value,
    });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    toast({
      position: "top-right",
      duration: 1e3,
      status: "success",
      title: "Success, Please check your email inbox",
    });
    timeout = setTimeout(() => {
      timeout && clearTimeout(timeout);
      setIsLoading(false);
      router.push(URLS.LOGIN);
    }, 2e3);
  }

  return { state, isLoading, onChange, onSubmit };
}
