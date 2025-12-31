// app/about/page.tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto ">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            About Us
          </h1>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            Building the future of e-commerce with innovative solutions that
            help businesses grow and succeed online.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                CodeSprint Lab was founded with a simple mission: to make
                e-commerce accessible to everyone. We started as a small team of
                developers passionate about building beautiful and functional
                online stores.
              </p>
              <p className="text-muted-foreground">
                Today, we power hundreds of online businesses with our
                multi-tenant platform, helping entrepreneurs and established
                brands reach their customers worldwide.
              </p>
            </div>
            <div className="aspect-video rounded-lg bg-muted flex items-center justify-center overflow-hidden">
              <img
                src="/api/placeholder/600/400"
                alt="Our office"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 aspect-video rounded-lg bg-muted flex items-center justify-center overflow-hidden">
              <img
                src="/api/placeholder/600/400"
                alt="Our platform"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-4">What We Do</h2>
              <p className="text-muted-foreground mb-4">
                We provide a complete e-commerce platform that handles
                everything from product management to order fulfillment. Our
                platform is built on modern technology to ensure fast
                performance and reliability.
              </p>
              <p className="text-muted-foreground">
                Whether you're launching your first online store or managing
                multiple storefronts, our platform scales with your business
                needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      {/*  <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-3">Easy to Use</h3>
              <p className="text-muted-foreground">
                Intuitive interface designed for everyone, no technical
                knowledge required.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-3">Fast & Reliable</h3>
              <p className="text-muted-foreground">
                Built with modern technology to deliver lightning-fast
                performance.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="text-muted-foreground">
                Our team is always here to help you succeed with your online
                store.
              </p>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Location Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Location</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Map */}
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.49992726784!2d90.25446312476425!3d23.780753030956088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1735123456789!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Contact Info */}
            <div className="flex flex-col justify-center gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Visit Us</h3>
                <p className="text-muted-foreground">
                  Come visit our office and meet the team behind CodeSprint Lab.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Address</p>
                    <p className="text-muted-foreground">
                      House 123, Road 45
                      <br />
                      Gulshan, Dhaka 1212
                      <br />
                      Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Phone</p>
                    <p className="text-muted-foreground">+880 1234-567890</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <p className="text-muted-foreground">
                      info@codesprintlab.com
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full md:w-auto">Contact Us</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Photo Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
          <div className="aspect-video rounded-lg bg-muted flex items-center justify-center overflow-hidden">
            <img
              src="/api/placeholder/800/450"
              alt="Our team"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-center text-muted-foreground mt-6 max-w-2xl mx-auto">
            A dedicated team of developers, designers, and support specialists
            working together to bring you the best e-commerce experience.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Store?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join hundreds of successful businesses using our platform to grow
            their online presence.
          </p>
          <Button size="lg">Get Started Today</Button>
        </div>
      </section>
    </main>
  );
}
