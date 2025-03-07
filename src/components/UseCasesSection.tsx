
import { BookOpen, Video, FileText, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UseCaseProps {
  icon: React.ReactNode;
  title: string;
  description: string[];
  className?: string;
}

const UseCase = ({ icon, title, description, className }: UseCaseProps) => (
  <div className={cn("flex flex-col gap-4 p-6 glass-panel", className)}>
    <div className="rounded-lg p-3 bg-primary/10 w-fit">
      {icon}
    </div>
    <h3 className="text-xl font-semibold">{title}</h3>
    <ul className="space-y-2">
      {description.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <div className="mt-1 text-primary">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const UseCasesSection = () => {
  return (
    <section className="w-full py-16 px-5 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <UseCase
            icon={<BookOpen className="h-6 w-6 text-blue-600" />}
            title="For Academics & Students"
            description={[
              "Transform video lectures into searchable text resources",
              "Find key concepts without rewatching entire videos",
              "Create study notes from educational content"
            ]}
            className="border-t-4 border-blue-500"
          />
          
          <UseCase
            icon={<Video className="h-6 w-6 text-purple-600" />}
            title="For Content Creators"
            description={[
              "Generate accurate captions for better engagement",
              "Repurpose video content into blogs and social posts",
              "Create accessible content for wider audiences"
            ]}
            className="border-t-4 border-purple-500"
          />
          
          <UseCase
            icon={<FileText className="h-6 w-6 text-green-600" />}
            title="For Media Professionals"
            description={[
              "Extract precise quotes from video interviews",
              "Quickly search for specific statements or topics",
              "Streamline content production workflows"
            ]}
            className="border-t-4 border-green-500"
          />
          
          <UseCase
            icon={<LineChart className="h-6 w-6 text-amber-600" />}
            title="For Business & Marketing"
            description={[
              "Analyze competitor video content for insights",
              "Extract key points from industry presentations",
              "Document client testimonials and feedback"
            ]}
            className="border-t-4 border-amber-500"
          />
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
