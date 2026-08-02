import Link from 'next/link';
import React from 'react'

type BlogDetatilsProps = {
  params: {
    title: string;
  };
};

async function BlogDetails({ params }: BlogDetatilsProps) {
  const { title } = await params;
  return (
   
    <main className="text-2xl font-cpc font-bold mb-6 p-4">
       <Link href="/blogs" className="text-red-255">{`<--`} กลับไปข่าวชมรม
       </Link>
       <div className="text-8xl font-cpc font-bold mb-6 p-4">{title}</div>
    </main>
  )
}

export default BlogDetails;