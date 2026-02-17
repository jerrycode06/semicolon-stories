import { Layout } from "@/components/Layout";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Briefcase,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const socialLinks = [
  {
    icon: X,
    href: "https://x.com/_headless_coder",
    label: "X",
    username: "@_headless_coder",
  },
  {
    icon: Github,
    href: "https://github.com/jerrycode06",
    label: "GitHub",
    username: "jerrycode06",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/nikhil-upadhyay-166673150/",
    label: "LinkedIn",
    username: "in/nikhil",
  },
  {
    icon: Mail,
    href: "mailto:nikhil9690@gmail.com",
    label: "Email",
    username: "nikhil9690@gmail.com",
  },
];

const About = () => {
  return (
    <Layout>
      <SEO
        title="About"
        description="Learn more about me, my work, and my experience as a software engineer."
        url="/about"
      />
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="h-32 w-32 overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-primary/40 p-1">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-card font-mono text-3xl font-bold text-primary">
                <img
                  src="/my-photo.jpg"
                  alt="My Photo"
                  height={200}
                  width={200}
                />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Nikhil Upadhyay
            </h1>
            <p className="mt-1 text-lg text-muted-foreground">
              Software Engineer
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                <span>Oracle</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Bengaluru, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">About Me</h2>
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              Hey, I’m Nikhil — a software engineer obsessed with clean
              abstractions and fast interfaces.
            </p>
            <p>
              At Oracle, I’ve led frontend architecture decisions, migrated
              legacy systems to modern React, optimized performance from seconds
              to milliseconds, and built engineering standards that multiple
              teams follow. I enjoy solving messy architectural problems and
              turning them into systems that feel simple and reliable.
            </p>
            <p>
              I write about software engineering, React patterns, TypeScript, AI
              experiments, performance tuning, and the real lessons that come
              from shipping production systems — not just tutorials.
            </p>
            <p>
              When I’m not debugging or refactoring something, I’m probably
              traveling somewhere new or experimenting with a better coffee brew
              ratio. I believe both code and coffee get better when you slow
              down and pay attention to the details.
            </p>
            <p>
              This blog is my space to think out loud, share what works, and
              occasionally admit what didn’t.
            </p>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "TypeScript",
              "React",
              "Next.js",
              "Node.js",
              "Express.js",
              "PostgreSQL",
              "Oracle Database",
              "Redis",
              "Docker",
              "AWS",
              "GraphQL",
              "Tailwind CSS",
              "Jest",
              "Unit Testing",
              "CI/CD"
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-card px-3 py-1 font-mono text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Social Links */}
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">Connect With Me</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {socialLinks.map(({ icon: Icon, href, label, username }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-card/80"
              >
                <Icon className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">{label}</div>
                  <div className="text-sm text-muted-foreground">
                    {username}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-lg border border-border bg-card p-6 text-center">
          <h2 className="text-xl font-semibold">Let's Work Together</h2>
          <p className="mt-2 text-muted-foreground">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
          <Button asChild className="mt-4">
            <a href="mailto:nikhil9690@gmail.com">Get In Touch</a>
          </Button>
        </section>
      </div>
    </Layout>
  );
};

export default About;
