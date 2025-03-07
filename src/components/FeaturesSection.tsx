
import { CheckCircle, Zap, Brain, Clock, Globe } from 'lucide-react';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="flex flex-col gap-3 p-5 bg-white/50 dark:bg-gray-900/50 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center gap-3">
      <div className="p-2.5 bg-primary/10 text-primary rounded-lg">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const FeaturesSection = () => {
  return (
    <section className="w-full py-12 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-3">Powerful Transcript Tools</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Unlock the potential of your video content with our advanced transcript extraction and processing features
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard 
            icon={<CheckCircle className="h-5 w-5" />} 
            title="Complete & Free" 
            description="Extract full transcripts from any YouTube video at no cost, with no artificial limitations."
          />
          
          <FeatureCard 
            icon={<Zap className="h-5 w-5" />} 
            title="Instant & Reliable" 
            description="One-click access to captions with multiple export formats including .txt, .srt, .vtt, and .csv."
          />
          
          <FeatureCard 
            icon={<Brain className="h-5 w-5" />} 
            title="AI-Powered Insights" 
            description="Generate summaries and key points from transcripts using advanced AI technology."
          />
          
          <FeatureCard 
            icon={<Clock className="h-5 w-5" />} 
            title="Time-Saving Tools" 
            description="Search, annotate, and navigate through transcripts with precision and ease."
          />
          
          <FeatureCard 
            icon={<Globe className="h-5 w-5" />} 
            title="Multi-Language Support" 
            description="Work with transcripts in over 50 languages with automatic language detection."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
