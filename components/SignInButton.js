import Image from "next/image";
import { signInAction } from "@/helpers/actions";

function SignInButton({ roomId }) {
  return (
    <form action={signInAction}>
      <input type="hidden" value={roomId} name="roomId" />
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
