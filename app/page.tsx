import Image from "next/image";

export default function Home() {
  const navItems = [
    { number: "01", label: "Home" },
    { number: "02", label: "About" },
    { number: "03", label: "Notes" },
    { number: "04", label: "Contact" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-4 py-4 text-foreground sm:px-6 sm:py-6 lg:px-8 lg:py-7">
      <header
        className="absolute left-6 top-6 z-10 text-2xl font-bold sm:left-8 sm:top-8 lg:left-10 lg:top-10 lg:text-3xl"
        aria-label="TOMO"
      >
        TOMO.
      </header>

      <main className="relative mx-auto grid w-full max-w-7xl place-items-center overflow-hidden rounded-3xl bg-surface px-6 pb-28 pt-24 shadow-lg sm:min-h-[calc(100vh-3rem)] sm:px-10 lg:w-3/4 lg:px-14 lg:pb-24 lg:pt-16">
        <section
          className="grid w-full max-w-5xl items-center gap-7 md:grid-cols-2 lg:gap-16"
          aria-label="Introduction"
        >
          <div className="relative z-10">
            <Image
              src="/img/hi!.svg"
              alt="Hi!"
              width={273}
              height={169}
              className="mb-5 h-auto w-44 sm:mb-7 sm:w-48"
              priority
            />
            <h1 className="text-5xl font-bold leading-tight lg:text-6xl">
              I’m TOMO.
            </h1>
            <p className="mt-5 text-xl font-bold leading-tight lg:text-2xl">
              Frontend Engineer
              <br />
              Designer
            </p>
            <p className="mt-5 text-base font-medium leading-8 text-muted sm:text-lg lg:mt-6">
              Building thoughtful websites
              <br />
              through code and design.
            </p>
            <a
              className="mt-9 inline-flex items-center gap-4 border-b border-current pb-1 text-base font-bold leading-none lg:mt-10 lg:text-base"
              href="#work"
            >
              View Works
              <span aria-hidden="true">-&gt;</span>
            </a>
          </div>

          <div
            className="relative mx-auto aspect-[445/313] w-full max-w-lg md:max-w-2xl"
            aria-hidden="true"
          >
            <Image
              src="/img/eyecatch.png"
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 900px) 88vw, 46vw"
              priority
            />
          </div>
        </section>

        <div
          className="absolute bottom-8 left-8 grid justify-items-center gap-4 lg:bottom-20 lg:left-1/2 lg:-translate-x-1/2"
          aria-hidden="true"
        >
          <span className="block h-14 w-px bg-current lg:h-20" />
          <p className="m-0 text-xs font-medium">Scroll</p>
        </div>
      </main>

      <nav
        className="absolute bottom-8 right-7 z-10 lg:bottom-auto lg:right-12 lg:top-1/2 lg:-translate-y-1/2 xl:right-20"
        aria-label="Primary navigation"
      >
        <ul className="flex gap-4 lg:grid lg:gap-16">
          {navItems.map((item, index) => (
            <li key={item.label} className="relative">
              {index === 0 ? (
                <span
                  className="absolute -top-3 left-0 h-1.5 w-1.5 rounded-full bg-current lg:-left-6 lg:top-6 lg:h-2.5 lg:w-2.5"
                  aria-hidden="true"
                />
              ) : null}
              <a
                className="grid gap-1 text-xs font-bold leading-none sm:text-sm lg:gap-3 lg:text-base"
                href={`#${item.label.toLowerCase()}`}
              >
                <span className="text-xs font-medium lg:text-sm">
                  {item.number}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <p className="absolute bottom-6 left-6 z-10 text-xs font-medium sm:bottom-8 sm:left-8 lg:bottom-10 lg:left-10 lg:text-base">
        © 2024 TOMO.
      </p>
    </div>
  );
}
