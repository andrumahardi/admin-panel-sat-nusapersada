import { useReducer, useMemo, ChangeEvent, FormEvent } from "react";
import { reducer, initialState, Fields } from "./login-reducer";
import { useRouter } from "next/navigation";

export function useLogin() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const canLogin = useMemo(() => {
    let output = true;
    for (const key in state.values) {
      if (!state.values[key as keyof Fields]) {
        output = false;
      }
    }
    return output;
  }, [state.values]);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      name: e.target.name as keyof Fields,
      value: e.target.value,
    });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (canLogin) {
      router.push("/");
    }
  }

  return { canLogin, onChange, onSubmit };
}
