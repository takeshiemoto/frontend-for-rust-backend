import { NextPage } from "next";
import { z } from "zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { signupVerify } from "@/libs/api-client";

const queryParamsSchema = z.object({ token: z.string() });

const Verify: NextPage = () => {
  const router = useRouter();
  const [isFetched, setIsFetched] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const queryParams = queryParamsSchema.safeParse(router.query);

  useEffect(() => {
    if (isFetched) return;
    if (!router.isReady) return;
    if (!queryParams.success) {
      setIsInvalid(true);
      return;
    }

    (async () => {
      try {
        await signupVerify({ token: queryParams.data.token });
        setIsComplete(true);
        setIsFetched(true);
      } catch (_) {
        setIsInvalid(true);
        return;
      }
    })();
  }, [isFetched, queryParams, router]);

  if (isInvalid) {
    return (
      <div>
        <h1>Verify</h1>
        <p>Invalid token.</p>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div>
        <h1>Verify</h1>
        <p>Complete.</p>
      </div>
    );
  }

  return <div>Loading...</div>;
};

export default Verify;
