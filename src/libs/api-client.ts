import axios, { AxiosResponse } from "axios";

export function apiClient() {
  return axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

type GetRequestOptions<T> = {
  params: T;
};

type PostRequestOptions<T> = {
  payload: T;
};

type SignupOption = {
  email: string;
  password: string;
};

export async function signup(
  options: PostRequestOptions<SignupOption>
): Promise<AxiosResponse<void>> {
  return apiClient().post("/v1/auth/signup", JSON.stringify(options.payload));
}

type SignupVerifyOption = {
  token: string;
};

export async function signupVerify(
  options: GetRequestOptions<SignupVerifyOption>
): Promise<AxiosResponse<void>> {
  return apiClient().get(
    `/v1/auth/signup/verify?token=${options.params.token}`
  );
}
