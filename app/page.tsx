import React from 'react';
import Image from 'next/image';
import AboutImage from '../public/about.png';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, MessageCircle, PieChart, Sparkle } from 'lucide-react';
import { signInWithGitHub } from './auth/action';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col min-h-[100dvh] pb-10">
      <NavBar />
      <Hero />

      <About />
    </main>
  );
}

function Hero() {
  return (
    <main className="flex-1">
      <section className="w-full py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex justify-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2 max-w-[50rem] text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  No more tracking money on excel sheets!
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto">
                  Genkin helps you track your cash flows using a chat based
                  system, and in-depth analysis of your spendings.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row mx-auto">
                <Button>Release Announcement 🎉</Button>

                <Link href="https://github.com/GeoBrodas/genkin">
                  <Button
                    variant={'outline'}
                    className="flex items-center space-x-2"
                  >
                    <Github className="h-5 w-5" />
                    <span>Star us on GitHub</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

async function NavBar() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <header className="px-4 lg:px-6 xl:px-14 h-14 flex justify-between items-center py-12">
      <h3 className="text-xl md:text-2xl">
        <span className="">genkin</span>.ai
        <span className="animate-ping">_</span>
      </h3>

      <div className="flex items-center">
        <Link href="https://www.linkedin.com/in/georgeyvb/">
          <Button className="hidden md:inline-flex" variant={'link'}>
            About the developer
          </Button>
        </Link>

        <form>
          {!user ? (
            <Button
              formAction={signInWithGitHub}
              className="text-xs md:text-base"
            >
              Sign In
            </Button>
          ) : (
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          )}
        </form>
      </div>
    </header>
  );
}

function About() {
  return (
    <main className="flex-1">
      <section className="w-full grid grid-cols-1 md:grid-cols-2 place-items-center px-4 md:px-10 pt-10">
        <div className="w-full">
          <Badge variant={'secondary'} className="mb-2">
            What&apos;s Genkin?
          </Badge>
          <h3 className="text-2xl font-semibold tracking-tighter sm:text-4xl xl:text-5xl/none">
            Talk Natural
          </h3>

          <p className="my-4">
            A new approach to web tools. Using the power of AI and React Server
            components
          </p>

          <div className="inline-flex md:hidden">
            <Image
              className="rounded-2xl shadow-xl"
              alt="about image"
              width={900}
              height={748}
              src={AboutImage}
            />
          </div>

          <ul className="pl-4 my-10 text-lg flex flex-col space-y-6 md:space-y-4">
            <li className="flex items-center">
              <Sparkle className="mr-3 md:mr-4 bg-rose-50 p-2 h-10 w-10 rounded-xl" />
              <span className="w-fit px-2 text-sm md:text-lg">
                Genkin leverages advanced Gemini 1.5 Flash technology to provide
                rapid responses to your queries, giving you instant financial
                insights.
              </span>
            </li>
            <li className="flex items-center">
              <MessageCircle className="mr-3 md:mr-4 bg-rose-50 p-2 h-10 w-10 rounded-xl" />
              <span className="w-fit px-2 text-sm md:text-lg">
                Chat with Genkin naturally, just like you would with a friend.
                Easily add your daily transactions by simply telling Genkin,
                e.g., &apos;Hey Genkin, I bought a new pair of glasses for
                $50.&apos;
              </span>
            </li>
            <li className="flex items-center">
              <PieChart className="mr-3 md:mr-4 bg-rose-50 p-2 h-10 w-10 rounded-xl" />{' '}
              <span className="w-fit px-2 text-sm md:text-lg">
                Understand your spending habits with clear, interactive charts.
                Full control over filter and sorting.
              </span>
            </li>
          </ul>
        </div>
        <div className="hidden md:inline-flex">
          <Image
            className="rounded-2xl shadow-xl"
            alt="about image"
            width={900}
            height={748}
            src={AboutImage}
          />
        </div>
      </section>
    </main>
  );
}
