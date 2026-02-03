import { getProjects, getAbout, getSkills, getExperiences, getSocialLinks, getSeo } from '@/actions/dashboard';
import ProjectCard from '@/components/project-card';
import { Navbar } from '@/components/navbar';
import { getUser } from '@/actions/auth';
import { Github, Linkedin, Mail, Code, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const { data: seo } = await getSeo();

  const title = seo?.title || 'Portfolio - Full Stack Developer';
  const description = seo?.description || 'Experienced full stack developer specializing in React, Node.js, and modern web technologies';
  const keywords = seo?.keywords || 'web development, react, nodejs, portfolio';
  const ogImage = seo?.og_image || '/og-image.jpg'; // fallback image

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : [],
    },
    twitter: {
      card: seo?.twitter_card === 'summary_large_image' ? 'summary_large_image' : 'summary',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function Home() {
  const { data: projects } = await getProjects();
  const { data: about } = await getAbout();
  const { data: skills } = await getSkills();
  const { data: experiences } = await getExperiences();
  const { data: socialLinks } = await getSocialLinks();
  const { data: seo } = await getSeo();
  const user = await getUser();

  const getSocialIcon = (platform: string, icon?: string | null) => {
    if (icon) {
      // If custom icon is specified, use it (assuming it's a Lucide icon name)
      const IconComponent = require('lucide-react')[icon] || Github;
      return IconComponent;
    }

    // Default icons based on platform
    switch (platform.toLowerCase()) {
      case 'github':
        return Github;
      case 'linkedin':
        return Linkedin;
      case 'twitter':
        return require('lucide-react').Twitter;
      case 'instagram':
        return require('lucide-react').Instagram;
      case 'facebook':
        return require('lucide-react').Facebook;
      case 'youtube':
        return require('lucide-react').Youtube;
      case 'dribbble':
        return require('lucide-react').Dribbble;
      case 'behance':
        return require('lucide-react').Behance;
      case 'medium':
        return require('lucide-react').BookOpen;
      case 'dev.to':
        return Code;
      case 'email':
        return Mail;
      case 'website':
        return require('lucide-react').Globe;
      default:
        return require('lucide-react').ExternalLink;
    }
  };

  const getSocialLabel = (platform: string, url: string) => {
    if (platform.toLowerCase() === 'email') {
      return 'Contact';
    }
    return platform.charAt(0).toUpperCase() + platform.slice(1);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar isAuthenticated={!!user} />

      {/* Parallax Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-accent/8 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-secondary/8 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
      </div>

      <section className="relative pt-32 pb-20 px-4 overflow-hidden flex items-center min-h-[calc(100vh-80px)]">
        {/* Hero Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-muted/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-accent/3" />

        <div className="container mx-auto max-w-6xl relative z-10 w-full">
          <div className="space-y-8 text-center">
            <div className="space-y-4">
              <p className="text-sm md:text-base font-semibold text-primary/80 tracking-widest uppercase animate-fade-in-up">Welcome to my portfolio</p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Mazayu Fildza<br />Cahaya Ghassani
              </h1>
              <h2 className="text-xl md:text-3xl font-semibold text-primary/90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                UI/UX Designer & Web Developer
              </h2>
            </div>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              Seorang UI/UX Designer dan Web Developer yang passionate dalam menciptakan desain interface yang menarik dan memberikan pengalaman pengguna yang intuitif untuk aplikasi web modern.
            </p>

            <div className="flex gap-4 justify-center flex-wrap pt-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {socialLinks && socialLinks.length > 0 ? (
              socialLinks.map((link) => {
                const IconComponent = getSocialIcon(link.platform, link.icon);
                const label = getSocialLabel(link.platform, link.url);
                const isExternal = !link.url.startsWith('mailto:');

                return (
                  <Button key={link.id} size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 font-semibold" asChild>
                    <a
                      href={link.url}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                    >
                      <IconComponent className="mr-2 h-5 w-5" />
                      {label}
                    </a>
                  </Button>
                );
              })
            ) : (
              <>
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 font-semibold" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </a>
                </Button>
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 font-semibold" asChild>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-5 w-5" />
                    LinkedIn
                  </a>
                </Button>
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 font-semibold" asChild>
                  <a href="mailto:hello@example.com">
                    <Mail className="mr-2 h-5 w-5" />
                    Contact
                  </a>
                </Button>
              </>
            )}
          </div>
        </div>
        </div>
      </section>

      {about && (
        <section id="about" className="py-20 px-4 bg-gradient-to-b from-muted/10 to-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
              <p className="text-muted-foreground text-lg">Get to know me better</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center md:justify-start">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl blur-2xl opacity-40" />
                  <Avatar className="w-80 h-80 relative border-4 border-background/80 shadow-2xl">
                    <AvatarImage src={about.photo_url || undefined} alt="Profile" />
                    <AvatarFallback className="text-4xl bg-gradient-to-br from-primary to-accent text-primary-foreground">MFG</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-3">Passionate Designer & Developer</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {about.bio}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-muted/50 rounded-xl border border-border/40">
                    <p className="text-3xl font-bold text-primary">10+</p>
                    <p className="text-sm text-muted-foreground">Projects Completed</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl border border-border/40">
                    <p className="text-3xl font-bold text-primary">5+</p>
                    <p className="text-sm text-muted-foreground">Years Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section id="skills" className="py-20 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <Code className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & Technologies</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A collection of technologies and tools I've worked with to build amazing digital experiences
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.map((skill) => (
                <div 
                  key={skill.id} 
                  className="group relative p-4 bg-gradient-to-br from-muted/80 to-muted/40 border border-border/40 rounded-xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-default"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <p className="relative font-semibold text-center text-foreground group-hover:text-primary transition-colors duration-300">
                    {skill.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {experiences && experiences.length > 0 && (
        <section id="experience" className="py-20 px-4 bg-gradient-to-b from-background to-muted/10">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <Briefcase className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Work Experience</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                My professional journey and key achievements
              </p>
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

              <div className="space-y-12">
                {experiences.map((experience, index) => (
                  <div key={experience.id} className="relative flex items-start gap-8">
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg z-10 border-4 border-background">
                      <Briefcase className="h-8 w-8 text-primary-foreground" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-gradient-to-br from-muted/80 to-muted/40 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-border/40 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div className="mb-2 md:mb-0">
                          <h3 className="text-xl font-bold text-foreground mb-1">{experience.title}</h3>
                          <p className="text-primary font-semibold text-lg">{experience.company}</p>
                        </div>
                        <div className="text-sm text-muted-foreground bg-background/50 px-3 py-1 rounded-full font-medium">
                          {new Date(experience.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - {experience.end_date ? new Date(experience.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {experience.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="projects" className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore some of my latest work and creative projects
            </p>
          </div>

          {projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  tags={['Project']}
                  imageUrl={project.image_url}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No projects yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-gradient-to-b from-muted/10 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Have a project in mind? I'd love to hear from you. Let's create something amazing together.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
           {socialLinks && socialLinks.length > 0 ? (
              socialLinks.map((link) => {
                const IconComponent = getSocialIcon(link.platform, link.icon);
                const label = getSocialLabel(link.platform, link.url);
                const isExternal = !link.url.startsWith('mailto:');

                return (
                  <Button key={link.id} size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 font-semibold" asChild>
                    <a
                      href={link.url}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                    >
                      <IconComponent className="mr-2 h-5 w-5" />
                      {label}
                    </a>
                  </Button>
                );
              })
            ) : (
              <>
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 font-semibold" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </a>
                </Button>
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 font-semibold" asChild>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-5 w-5" />
                    LinkedIn
                  </a>
                </Button>
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 font-semibold" asChild>
                  <a href="mailto:hello@example.com">
                    <Mail className="mr-2 h-5 w-5" />
                    Contact
                  </a>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 py-12 mt-16 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">&copy; 2024 Mazayu Fildza Cahaya Ghassani. All rights reserved.</p>
            <p className="text-sm">Crafted with ❤️ using Next.js, React, and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
