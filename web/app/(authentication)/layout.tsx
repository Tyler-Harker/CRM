interface AuthenticationLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticationLayout({
  children,
}: AuthenticationLayoutProps) {
  return (
    <div className="flex h-full items-center p-4 justify-center">
      <section className="bg-white w-full py-8 px-8 rounded-md border border-gray-300 shadow-lg h-fit max-w-[30rem]">
        {children}
      </section>
    </div>
  );
}
