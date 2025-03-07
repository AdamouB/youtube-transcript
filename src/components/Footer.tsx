
import { MessageCircle, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-8 px-5 bg-secondary/30 border-t border-border/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Transcript To Go</h3>
            <p className="text-sm text-muted-foreground">
              The ultimate tool for extracting, processing, and utilizing YouTube video transcripts.
            </p>
            <div className="pt-2">
              <a 
                href="https://discord.gg/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Join our Discord</span>
              </a>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#tools" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Essential Tools
                </a>
              </li>
              <li>
                <a href="#guide" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  How-to Guide
                </a>
              </li>
              <li>
                <a href="#extract" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Extraction Tips
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Contact</h3>
            <p className="text-sm text-muted-foreground">
              Have questions or feedback? We'd love to hear from you.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a href="mailto:contact@transcripttogo.com" className="hover:text-primary transition-colors">
                contact@transcripttogo.com
              </a>
            </div>
            <p className="text-xs text-muted-foreground pt-4">
              © {new Date().getFullYear()} Transcript To Go. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
