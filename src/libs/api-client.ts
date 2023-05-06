import axios, { AxiosResponse } from "axios";

export function apiClient() {
  return axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

type SignupPayload = {
  email: string;
  password: string;
};

export async function signup(
  payload: SignupPayload
): Promise<AxiosResponse<void>> {
  return apiClient().post("/v1/auth/signup", JSON.stringify(payload));
}

type SignupVerifyPayload = {
  token: string;
};

export async function signupVerify(
  payload: SignupVerifyPayload
): Promise<AxiosResponse<void>> {
  return apiClient().get(`/v1/auth/signup/verify?token=${payload.token}`);
}
