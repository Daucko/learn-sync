import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="px-4 sm:px-10 py-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Your Learning, Simplified.
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              The central hub for all your assignments, tutorials, and grades.
              Stay organized and focused on what matters most.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 h-12 px-8 text-base font-bold"
          >
            Get Started
          </Button>
        </div>

        <div className="flex-1 w-full">
          <div
            className="w-full aspect-square bg-cover bg-center rounded-xl min-w-[300px] lg:min-w-[400px] shadow-lg"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDVC02J3rUQLIgK5slaVfVZSqQSQvTlJLPffS3X1m-kAQgQ4VJtJBdvnnKjWCls7KSFdPD6rEPrAkakhkUNLlNc3If0bn27tdiDVeEyhnfdWC4qqfgZNfcP0f0Tbcqtv_3fV1oEUA-WU1JP5Q5telxT4szCEXHsrD_mQMUczyj4sVpCVhDv3drjFckYCcGhpz3ig7IAH7rh3_dasM5TjWV63egHSlphoM_upWawjsdvfj4X_WArXGRzQkbq8wZOiIroL-GEyJP4OW2A")`,
            }}
            aria-label="A modern, abstract illustration showing students collaborating and using digital devices for learning"
          />
        </div>
      </div>
    </section>
  );
}
