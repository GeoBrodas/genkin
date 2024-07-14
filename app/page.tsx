import React from 'react';
import Image from 'next/image';
import AboutImage from '../public/about.png';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, MessageCircle, PieChart, Sparkle } from 'lucide-react';

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
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  No more tracking money on excel sheets!
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Genkin helps you track your inflows and outflows using a
                  simple chat based system, with analysis of your spends.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button>Get Started</Button>
                <Button
                  variant={'outline'}
                  className="flex items-center space-x-2"
                >
                  <Github className="h-5 w-5" />
                  <span>Star us on GitHub</span>
                </Button>
              </div>
            </div>
            {/* <img
                src="/placeholder.svg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              /> */}
          </div>
        </div>
      </section>
    </main>
  );
}

function NavBar() {
  return (
    <header className="px-4 lg:px-6 xl:px-14 h-14 flex justify-between items-center py-12">
      <h3 className="text-2xl">
        <span className="">genkin</span>.ai
        <span className="animate-ping">_</span>
      </h3>

      <div>
        <Button variant={'link'}>Privacy Policy</Button>
        <Button variant={'link'}>Behind the scenes</Button>
        <Button>Sign In</Button>
      </div>
    </header>
  );
}

function About() {
  return (
    <main className="flex-1">
      <section className="w-full grid grid-cols-2 place-items-center px-10 pt-10">
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

          <ul className="pl-4 my-10 text-lg flex flex-col space-y-4">
            <li className="flex items-center">
              <Sparkle className="mr-4 bg-rose-50 p-2 h-10 w-10 rounded-xl" />
              <span className="w-fit px-2">
                {' '}
                Genkin uses Gemini 1.5 flash to deliver repsonses to prompts
                quickly.
              </span>
            </li>
            <li className="flex items-center">
              <MessageCircle className="mr-4 bg-rose-50 p-2 h-10 w-10 rounded-xl" />
              <span className="w-fit px-2">
                Use Genkin like any other prompt assistant. Talk to it for
                adding your day-to-day transactions. eg: &quot;Hey Genkin, I
                bought a pair of glasses today worth $50&quot;
              </span>
            </li>
            <li className="flex items-center">
              <PieChart className="mr-4 bg-rose-50 p-2 h-10 w-10 rounded-xl" />{' '}
              <span className="w-fit px-2">
                Ananlyse your transactions using interactive charts and
                in-detail analysis. If lucky, you'll get some tips from Genkin
                on how to save money!
              </span>
            </li>
          </ul>
        </div>
        <div>
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
