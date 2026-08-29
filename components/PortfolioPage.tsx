import { Link } from "@tanstack/react-router";
import {
  SelectField,
  TextareaField,
  TextField,
} from "@/components/ui/FormField";
import {
  ArrowDownIcon,
  ArrowRightIcon,
} from "@/components/ui/Icons";
import { useState, type FormEvent } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const blogPosts = [
  {
    category: "Frontend",
    date: "2024.05.12",
    title: "Next.jsのApp Routerを使って開発してみて感じたこと",
    description:
      "実際のプロジェクトで導入してみて、良かった点やハマったポイントをまとめました。",
  },
  {
    category: "Design",
    date: "2024.04.28",
    title: "余白を意識したレイアウトの作り方",
    description:
      "デザインにおける余白の役割や、心地よい余白の取り方について考えを整理しました。",
  },
  {
    category: "Frontend",
    date: "2024.04.15",
    title: "CSSアニメーションの基本と実装のコツ",
    description:
      "よく使うアニメーションのパターンと、実装する上で意識しているポイントを紹介します。",
  },
  {
    category: "Life",
    date: "2024.04.02",
    title: "最近購入した古着とコーディネート",
    description:
      "最近購入した古着と、コーディネートの記録。好きなものについて書きました。",
  },
];

export function PortfolioPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-canvas text-ink lg:h-svh lg:overflow-hidden">
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 lg:hidden">
        <div className="flex items-start justify-between gap-4">
          <a
            href="/"
            className="pointer-events-auto inline-flex h-12 items-center rounded-full bg-background px-5 text-xl font-black text-ink"
            aria-label="TOMO ホーム"
          >
            TOMO.
          </a>

          <button
            type="button"
            className="pointer-events-auto relative grid size-12 cursor-pointer place-items-center rounded-full bg-background text-ink"
            aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="sr-only">Menu</span>
            <span
              className={`absolute h-0.5 w-6 bg-ink transition-transform ${
                isMenuOpen ? "rotate-45" : "-translate-y-1"
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 bg-ink transition-transform ${
                isMenuOpen ? "-rotate-45" : "translate-y-1"
              }`}
            />
          </button>
        </div>

      </header>

      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 cursor-pointer bg-ink/60 transition-opacity duration-200 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-label="メニューを閉じる"
          onClick={() => setIsMenuOpen(false)}
        />

        <nav
          id="mobile-navigation"
          className={`relative rounded-b-3xl bg-canvas px-6 pb-6 pt-20 text-background transition-transform duration-200 ease-out ${
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
          aria-label="モバイルナビゲーション"
        >
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.href === "/" ? (
                  <a
                    href="/"
                    className="block rounded-2xl px-4 py-3 text-lg font-black uppercase text-background transition-colors hover:bg-background hover:text-ink"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to="/"
                    hash={item.href.slice(1)}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-lg font-black uppercase text-background transition-colors hover:bg-background hover:text-ink"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto max-w-site lg:grid lg:h-svh lg:grid-cols-site lg:gap-2 lg:p-2">
        <aside
          className="relative h-hero-mobile overflow-hidden bg-canvas lg:h-full lg:rounded-3xl"
        >
          <a
            href="/"
            className="absolute left-7 top-7 z-10 hidden h-12 items-center rounded-full bg-background px-5 text-xl font-black text-ink lg:inline-flex"
            aria-label="TOMO ホーム"
          >
            TOMO.
          </a>
          <img
            src="/img/hero-designer.png"
            alt="ノートパソコンで制作するTOMOのイラスト"
            width={1552}
            height={1040}
            className="absolute inset-0 size-full object-cover object-center"
          />
        </aside>

        <main
          className="min-w-0 space-y-2 p-2 pt-0 lg:h-full lg:overflow-y-auto lg:overscroll-contain lg:p-0"
          aria-label="メインコンテンツ"
        >
          <section
            className="relative flex min-h-svh scroll-mt-2 items-center justify-center rounded-3xl bg-background px-6 py-28 text-center sm:px-10"
            aria-labelledby="hero-title"
          >
            <div className="max-w-2xl">
              <h1
                id="hero-title"
                className="font-black leading-none"
              >
                <span className="block text-5xl sm:text-6xl 2xl:text-7xl">
                  TOMO.
                </span>
                <span className="mt-4 block text-sm sm:text-base">
                  FRONTEND ENGINEER & WEB DESIGNER
                </span>
              </h1>
            </div>

            <p className="scroll-cue absolute inset-x-0 bottom-10 flex flex-col items-center justify-center gap-1 text-xs font-bold text-ink">
              <span>SCROLL DOWN</span>
              <ArrowDownIcon className="size-4" />
            </p>
          </section>

          <section
            id="about"
            className="scroll-mt-2 rounded-3xl bg-background px-6 py-20 sm:px-8 sm:py-24"
            aria-labelledby="about-title"
          >
            <h2
              id="about-title"
              className="text-center text-5xl font-black leading-none sm:text-6xl"
            >
              ABOUT
            </h2>

            <div className="mt-14 grid items-center gap-10 md:grid-cols-2">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-canvas">
                <img
                  src="/img/about-profile.png"
                  alt="TOMOのプロフィールイラスト"
                  width={1223}
                  height={1286}
                  className="absolute inset-0 size-full object-contain object-bottom"
                />
              </div>

              <div>
                <p className="text-3xl font-black sm:text-4xl">
                  TOMO
                </p>
                <div className="mt-7 space-y-5 text-sm leading-8 text-ink sm:text-base">
                  <p>
                    約3年半フレンチレストランに勤務したのち、Web業界へ転職。
                  </p>
                  <p>
                    現在はWeb制作会社で、フロントエンドエンジニア・デザイナーとして働いています。
                  </p>
                  <p>
                    実装するだけではなく、長く運用できる設計や、全体を見据えたスケジューリング、クライアントの想いを整理するデザインを大切にしながら制作しています。
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            id="blog"
            className="scroll-mt-2 rounded-3xl bg-background px-6 py-20 sm:px-8 sm:py-24"
            aria-labelledby="blog-title"
          >
            <div className="text-center">
              <h2
                id="blog-title"
                className="text-5xl font-black leading-none sm:text-6xl"
              >
                BLOG
              </h2>
              <p className="mx-auto mt-7 max-w-lg text-sm leading-7 text-ink sm:text-base">
                日々の制作で学んだことと、デザイン、コード、好きなものについてのブログです。
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {blogPosts.map((post) => (
                <article key={post.title}>
                  <Link
                    to="/"
                    hash="blog"
                    className="group flex min-h-80 cursor-pointer flex-col rounded-2xl bg-surface px-5 py-6 text-ink transition-[filter] hover:brightness-[0.98]"
                  >
                    <div className="flex items-center justify-between gap-5 text-sm font-bold">
                      <p className="rounded-full bg-background px-3 py-1 text-xs text-ink">
                        {post.category}
                      </p>
                      <time
                        dateTime={post.date.replaceAll(".", "-")}
                        className="text-xs font-medium text-subtle"
                      >
                        {post.date}
                      </time>
                    </div>
                    <div className="mt-8 flex flex-1 flex-col">
                      <h3 className="text-lg font-bold leading-8">
                        {post.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-muted">
                        {post.description}
                      </p>
                    </div>
                    <span
                      className="mt-8 inline-flex size-11 items-center justify-center self-end rounded-full bg-canvas text-background transition-[filter] group-hover:brightness-110"
                      aria-hidden="true"
                    >
                      <ArrowRightIcon className="size-5" />
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section
            id="contact"
            className="scroll-mt-2 rounded-3xl bg-background px-6 py-20 sm:px-8 sm:py-24"
            aria-labelledby="contact-title"
          >
            <div className="text-center">
              <h2
                id="contact-title"
                className="text-5xl font-black leading-none sm:text-6xl"
              >
                CONTACT
              </h2>
              <p className="mx-auto mt-7 max-w-lg text-sm leading-7 text-ink sm:text-base">
                ご相談・お仕事のご依頼など、お気軽にお問い合わせください。内容を確認後、2〜3営業日以内にご返信します。
              </p>
            </div>

            <form
              onSubmit={handleContactSubmit}
              className="mt-12 rounded-2xl bg-surface p-6 sm:p-8"
            >
              <div className="grid gap-y-8">
                <TextField
                  id="name"
                  name="name"
                  label="お名前"
                  type="text"
                  autoComplete="name"
                  placeholder="例）山田 太郎"
                  required
                />
                <TextField
                  id="email"
                  name="email"
                  label="メールアドレス"
                  type="email"
                  autoComplete="email"
                  placeholder="例）tomo@example.com"
                  required
                />
                <SelectField
                  id="budget"
                  name="budget"
                  label="ご予算"
                  defaultValue=""
                  required
                >
                  <option value="">
                    選択してください
                  </option>
                  <option value="under-100000">〜10万円</option>
                  <option value="100000-300000">10〜30万円</option>
                  <option value="300000-500000">30〜50万円</option>
                  <option value="over-500000">50万円〜</option>
                  <option value="undecided">未定・相談したい</option>
                </SelectField>
                <TextareaField
                  id="message"
                  name="message"
                  label="お問い合わせ内容"
                  placeholder="ご相談内容やご依頼の概要をご記入ください"
                  required
                />
              </div>

              <button
                type="submit"
                className="mx-auto mt-10 flex w-full max-w-56 cursor-pointer items-center justify-center rounded-full bg-canvas px-8 py-3.5 text-center text-sm font-bold text-background transition-[filter] hover:brightness-110"
              >
                送信する
              </button>
            </form>
          </section>

          <footer className="px-6 py-14 text-background sm:px-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-4xl font-black">TOMO.</p>
              <p className="text-xs text-footer-muted">
                © 2026 TOMO. All Rights Reserved.
              </p>
            </div>
          </footer>
        </main>

        <aside
          className="hidden h-full flex-col rounded-3xl bg-background p-6 lg:flex"
        >
          <nav aria-label="メインナビゲーション">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  {item.href === "/" ? (
                    <a
                      href="/"
                      className="block rounded-2xl px-4 py-3 text-lg font-black uppercase text-ink transition-colors hover:bg-canvas hover:text-background"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to="/"
                      hash={item.href.slice(1)}
                      className="block rounded-2xl px-4 py-3 text-lg font-black uppercase text-ink transition-colors hover:bg-canvas hover:text-background"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

        </aside>
      </div>
    </div>
  );
}
