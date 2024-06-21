"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

function LoginMessage({ roomId }) {
  const router = useRouter();

  return (
    <div className="grid bg-primary-800 ">
      <p className="text-center text-xl py-12 self-center">
        Please{" "}
        <button
          onClick={() => router.push(`/login?roomId=${roomId}`)}
          className="underline text-accent-500"
        >
          login
        </button>{" "}
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  );
}

export default LoginMessage;
