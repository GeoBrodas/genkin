import { Button } from '@/components/ui/button';
import { ChevronDown, Github } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <main className="flex flex-col min-h-[100dvh]">
      <NavBar />
      <Hero />
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
