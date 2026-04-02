import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signupAccount } from "../services/apiAuth";

export function useSignup() {
  const mutation = useMutation({
    mutationFn: signupAccount,

    onSuccess: (data, variables) => {
      // variables contains what you passed to mutate()
      const { email } = variables;

      if (email) {
        localStorage.setItem("email", email);
      }

      toast.success("Account Created Successfully 🚀");
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || err.message);
    },
  });

  return mutation;
}
