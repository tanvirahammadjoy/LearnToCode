import Image from 'next/image'

export default function Page() {
  return (
    <div>
      <h1>Home Page</h1>
      <Image src="/next.svg" alt="Profile" width={100} height={100} />
    </div>
  );
}
