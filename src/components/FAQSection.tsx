
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "How do transcript extractions work?",
    answer: "Our tool connects to YouTube's caption system to retrieve the transcript data. We process this information and format it for easy reading, searching, and downloading in various formats."
  },
  {
    question: "Is this service completely free?",
    answer: "Yes! The basic transcript extraction service is entirely free with no limitations on the number of videos you can process. We also offer premium features for advanced users."
  },
  {
    question: "Can I generate summaries of video transcripts?",
    answer: "Absolutely! Our AI summary feature analyzes the transcript content and creates concise summaries highlighting the key points of the video."
  },
  {
    question: "How do I use the transcript extractor?",
    answer: "Simply paste a YouTube URL into the input field, click 'Get Transcript', and within seconds you'll have the full transcript ready to view, search, or download."
  },
  {
    question: "Which file formats are supported for downloads?",
    answer: "We support multiple formats including plain text (.txt), SubRip (.srt), WebVTT (.vtt), and comma-separated values (.csv) for different use cases."
  },
  {
    question: "Does the tool support multiple languages?",
    answer: "Yes, our tool supports over 50 languages. The language options displayed will depend on what's available for each specific video."
  },
  {
    question: "Can I extract transcripts from private videos?",
    answer: "No, our tool can only extract transcripts from public videos or videos you have proper access to while logged in."
  },
  {
    question: "How accurate are the extracted transcripts?",
    answer: "The accuracy depends on the quality of the original captions. For professionally captioned videos, the accuracy is excellent. For auto-generated captions, quality may vary."
  }
];

const FAQSection = () => {
  return (
    <section className="w-full py-16 px-5">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-3">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Everything you need to know about our transcript extraction service</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50">
              <AccordionTrigger className="text-left hover:no-underline py-4 font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
