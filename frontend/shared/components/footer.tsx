import Link from "next/link";

import { Separator } from "./ui/separator";

import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="
        border-t border-border
        bg-background/80
        backdrop-blur
      "
    >
      <div className="mx-auto max-w-6xl px-6 py-10 h-full w-full">
        <div
          className="
            grid gap-10

            md:grid-cols-2
            lg:grid-cols-4
          "
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div>
                <h2 className="text-sm font-semibold">DevHub</h2>

                <p className="text-xs text-muted-foreground">
                  social for developers
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p
              className="
                text-xs font-semibold uppercase
                tracking-[0.2em]
                text-muted-foreground
              "
            >
              Produto
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="#"
                className="
                  text-sm text-muted-foreground

                  transition-colors duration-200

                  hover:text-foreground
                "
              >
                Explore
              </Link>

              <Link
                href="#"
                className="
                  text-sm text-muted-foreground

                  transition-colors duration-200

                  hover:text-foreground
                "
              >
                Trending
              </Link>

              <Link
                href="#"
                className="
                  text-sm text-muted-foreground

                  transition-colors duration-200

                  hover:text-foreground
                "
              >
                Open Source
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <p
              className="
                text-xs font-semibold uppercase
                tracking-[0.2em]
                text-muted-foreground
              "
            >
              Empresa
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="#"
                className="
                  text-sm text-muted-foreground

                  transition-colors duration-200

                  hover:text-foreground
                "
              >
                Sobre
              </Link>

              <Link
                href="#"
                className="
                  text-sm text-muted-foreground

                  transition-colors duration-200

                  hover:text-foreground
                "
              >
                Contato
              </Link>

              <Link
                href="#"
                className="
                  text-sm text-muted-foreground

                  transition-colors duration-200

                  hover:text-foreground
                "
              >
                Carreiras
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <p
              className="
                text-xs font-semibold uppercase
                tracking-[0.2em]
                text-muted-foreground
              "
            >
              Legal
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="#"
                className="
                  text-sm text-muted-foreground

                  transition-colors duration-200

                  hover:text-foreground
                "
              >
                Privacidade
              </Link>

              <Link
                href="#"
                className="
                  text-sm text-muted-foreground

                  transition-colors duration-200

                  hover:text-foreground
                "
              >
                Termos
              </Link>

              <Link
                href="#"
                className="
                  text-sm text-muted-foreground

                  transition-colors duration-200

                  hover:text-foreground
                "
              >
                Licença
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        <div
          className="
            flex flex-col gap-5

            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p className="text-xs text-muted-foreground">
            © 2026 DevHub. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="
                flex h-10 w-10 items-center justify-center

                rounded-2xl

                border border-border
                bg-card

                text-muted-foreground

                transition-all duration-200

                hover:border-primary/30
                hover:bg-accent
                hover:text-foreground
              "
            >
              <FaGithub size={18} />
            </Link>

            <Link
              href="#"
              className="
                flex h-10 w-10 items-center justify-center

                rounded-2xl

                border border-border
                bg-card

                text-muted-foreground

                transition-all duration-200

                hover:border-primary/30
                hover:bg-accent
                hover:text-foreground
              "
            >
              <FaInstagram size={18} />
            </Link>

            <Link
              href="#"
              className="
                flex h-10 w-10 items-center justify-center

                rounded-2xl

                border border-border
                bg-card

                text-muted-foreground

                transition-all duration-200

                hover:border-primary/30
                hover:bg-accent
                hover:text-foreground
              "
            >
              <FaFacebook size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
