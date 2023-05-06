import { NextPage } from "next";
import { z } from "zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { signupVerify } from "@/libs/api-client";

const queryParamsSchema = z.object({ token: z.string() });

const Verify: NextPage = () => {
  const router = useRouter();
  const [isInvalid, setIsInvalid] = useState(false);
  const queryParams = queryParamsSchema.safeParse(router.query);

  useEffect(() => {
    if (!router.isReady) return;
    if (!queryParams.success) {
      setIsInvalid(true);
      return;
    }

    (async () => {
      try {
        await signupVerify({ token: queryParams.data.token });
        router.push("/signup/complete");
      } catch (_) {
        setIsInvalid(true);
        return;
      }
    })();
  }, [queryParams, router]);

  if (isInvalid) {
    return (
      <div>
        <h1>Verify</h1>
        <p>Invalid token.</p>
      </div>
    );
  }

  return null;
};

export default Verify;
