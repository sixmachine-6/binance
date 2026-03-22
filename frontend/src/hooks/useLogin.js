import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { loginAccount } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginAccount,
    onSuccess: () => {
      toast.success("Login successful");
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Login failed");
    },
  });
}
