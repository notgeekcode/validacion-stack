import React from "react";

type Props = {
  title: string;
  subtitle?: string;
  imageUrl: string;
  showSearch?: boolean;
};

export default function Hero({ title, subtitle, imageUrl, showSearch }: Props) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative h-[46vh] md:h-[56vh] w-full">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-soft will-change-transform hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative z-10 flex h-full flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 md:mt-3 text-white/90 text-base md:text-lg max-w-2xl">
              {subtitle}
            </p>
          )}
          {showSearch && (
            <div className="mt-5 md:mt-7 w-full max-w-xl">
              <input
                className="w-full rounded-xl bg-white/95 px-4 py-3 text-sm md:text-base shadow-soft outline-none ring-1 ring-black/5 placeholder:text-gray-500"
                placeholder="Buscar lugares, rutas, actividades…"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
