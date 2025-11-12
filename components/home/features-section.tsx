import { BookOpen, PlayCircle, TrendingUp } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-background rounded-xl border p-6 space-y-4 hover:shadow-lg transition-shadow dark:border-gray-700">
      <div className="text-secondary">{icon}</div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Easy Assignment Management',
      description:
        'Effortlessly download assignments and upload your solutions in one place.',
    },
    {
      icon: <PlayCircle className="w-8 h-8" />,
      title: 'Access Video Tutorials',
      description:
        'Watch engaging animated video instructions from your tutors anytime.',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Track Your Progress',
      description:
        'Check your grades and monitor your academic performance with ease.',
    },
  ];

  return (
    <section className="bg-muted px-4 sm:px-10 py-20 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Everything You Need to Succeed
          </h2>
          <p className="text-muted-foreground text-lg">
            LearnSync provides all the tools you need to stay organized and
            excel in your studies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
