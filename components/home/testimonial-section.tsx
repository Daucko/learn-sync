export default function TestimonialSection() {
  return (
    <section className="px-4 sm:px-10 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold">What Our Users Say</h2>
          <div className="p-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 rounded-lg text-center md:text-left max-w-4xl mx-auto">
              <div
                className="w-24 h-24 bg-cover bg-center rounded-full shrink-0 border-4 border-background shadow-lg"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCa0o8bkbR9Ul8XWv5MZ8yus8lCngKKxANtWKTZU14sHCGVTynsxTX3R8rGZxBd3ZR0lTL4fV389wOpfhTlS4fFgxTiMHx1kc2IsO0PdQ-okBkHYaxXkF4uYecmLII5lbOp1IXhFGKS4uQQZiWtG2uZk3OrYED2LqryfVQNBHYsEYJupeKT3g5ax6aC6q0G7hIWI-qjDkOonvNh4Yc9CoDpmVx9DxnEh6aL8Bt_6aWdIKQ25MxBPOxyOtWnZ4djaa94J6Bz5ScOyM-5")`,
                }}
                aria-label="Portrait of Jessica Miller, a happy student"
              />
              <div className="space-y-4">
                <blockquote className="text-xl font-medium leading-relaxed italic">
                  &ldquo;LearnSync has completely changed how I manage my
                  coursework. Everything is so intuitive and easy to find.
                  It&rsquo;s a lifesaver!&rdquo;
                </blockquote>
                <p className="text-muted-foreground">
                  <span className="font-bold text-foreground">
                    Jessica Miller
                  </span>
                  , University Student
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
