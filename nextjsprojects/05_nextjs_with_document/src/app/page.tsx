import Image from "next/image";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filters = (await searchParams).filters;
  return (
    <div>
      <h1>Home Page</h1>
      <Image src="/next.svg" alt="Profile" width={100} height={100} />
      <p>Filters: {filters}</p>
    </div>
  );
}
