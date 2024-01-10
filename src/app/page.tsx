import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className='bg-[url("https://images.unsplash.com/photo-1559521783-1d1599583485?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80")] bg-cover bg-center flex h-screen flex-col items-center justify-center gap-5'>
      <div className="flex flex-col gap-5">
        <h1 className="text-5xl font-bold text-center">YelpCamp</h1>
        <p className="max-w-prose text-center">
          Welcome to YelpCamp! Jump right in and explore our many campgrounds.
          Feel free to share some of your own and comment on others!
        </p>
        <div className="flex items-center justify-center">
          <Link className="btn btn-neutral" href="/campgrounds">
            View Campgrounds
          </Link>
        </div>
      </div>
    </main>
  );
}
