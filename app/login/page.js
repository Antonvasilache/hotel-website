import SignInButton from "@/components/SignInButton";

export const metadata = {
  title: "Login",
};

//user will be redirected here from the /account route if they are not logged in
export default function Page({ searchParams }) {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>

      <SignInButton roomId={searchParams.roomId} />
    </div>
  );
}
