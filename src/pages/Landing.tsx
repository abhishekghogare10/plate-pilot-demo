import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  BarChart3, 
  Users, 
  Rocket,
  CheckCircle,
  Shield,
  Clock,
  TrendingUp,
  Zap,
  DollarSign,
  Package,
  Utensils,
  Smartphone,
  MessageSquare,
  Star,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { plans } from '@/mocks/plans';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: ShoppingCart,
      title: 'Point of Sale',
      description: 'Fast and intuitive POS with KOT management, split billing, and real-time order tracking',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: '80+ comprehensive reports to track sales, inventory, and business performance',
    },
    {
      icon: Users,
      title: 'CRM & Loyalty',
      description: 'Build lasting customer relationships with integrated loyalty programs and marketing',
    },
    {
      icon: Package,
      title: 'Inventory Management',
      description: 'Real-time stock tracking, automated alerts, and smart reorder suggestions',
    },
    {
      icon: Utensils,
      title: 'Menu Management',
      description: 'Dynamic menu updates, recipe costing, and multi-location menu sync',
    },
    {
      icon: Smartphone,
      title: 'Online Ordering',
      description: 'Integrated online ordering with QR codes, mobile app, and delivery management',
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Automate routine tasks and reduce manual work by up to 60%',
    },
    {
      icon: TrendingUp,
      title: 'Boost Revenue',
      description: 'Increase sales by 35% with data-driven insights and customer loyalty',
    },
    {
      icon: Zap,
      title: 'Faster Service',
      description: 'Reduce order processing time and improve customer satisfaction',
    },
    {
      icon: DollarSign,
      title: 'Cut Costs',
      description: 'Minimize waste and optimize inventory to reduce costs by 25%',
    },
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Sign Up',
      description: 'Create your account in minutes and get instant access to all features',
    },
    {
      step: '2',
      title: 'Setup',
      description: 'Import your menu, add staff, and configure your restaurant settings',
    },
    {
      step: '3',
      title: 'Launch',
      description: 'Start taking orders and managing your restaurant operations seamlessly',
    },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Owner, Spice Garden',
      content: 'This platform transformed our operations. We\'ve seen a 40% increase in efficiency and our customers love the faster service.',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      role: 'Manager, Cafe Delight',
      content: 'The inventory management alone has saved us thousands. The reports are incredibly detailed and actionable.',
      rating: 5,
    },
    {
      name: 'Amit Patel',
      role: 'Owner, Multi-outlet Chain',
      content: 'Managing 5 locations was a nightmare. Now I can oversee everything from one dashboard. Game changer!',
      rating: 5,
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Active Restaurants' },
    { value: '5M+', label: 'Orders Processed' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' },
  ];

  const faqs = [
    {
      question: 'How long does setup take?',
      answer: 'Most restaurants are up and running within 24 hours. Our onboarding team assists with menu import and initial setup.',
    },
    {
      question: 'Do I need special hardware?',
      answer: 'No special hardware required. Works on any device with a browser - tablets, smartphones, or computers.',
    },
    {
      question: 'Can I manage multiple outlets?',
      answer: 'Yes! Our Growth and Enterprise plans support multi-outlet management with centralized control and reporting.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use bank-level encryption, regular backups, and comply with all data protection regulations.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Restaurant POS</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button onClick={() => navigate('/signup')}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="flex flex-col items-center text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Rocket className="h-4 w-4 mr-2 inline" />
              Trusted by 10,000+ Restaurants Worldwide
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight max-w-5xl">
              Transform Your Restaurant
              <br />
              <span className="text-primary">Operations Today</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              All-in-one restaurant management platform. From POS to inventory, CRM to analytics - 
              everything you need to run a successful restaurant business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => navigate('/signup')} className="gap-2">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                View Demo
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need in One Platform</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed specifically for restaurant management
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4">Benefits</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Platform?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4">Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started in 3 Easy Steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
                {index < howItWorks.length - 1 && (
                  <ChevronRight className="hidden md:block absolute top-8 -right-6 h-8 w-8 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4">Pricing</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Perfect Plan</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Flexible pricing for restaurants of all sizes. Start free, upgrade as you grow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={plan.id} 
                className={`relative flex flex-col ${index === 2 ? 'border-primary shadow-xl scale-105' : ''}`}
              >
                {index === 2 && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    {plan.price > 0 ? (
                      <>
                        <span className="text-4xl font-bold">₹{plan.price.toLocaleString()}</span>
                        <span className="text-muted-foreground">/month</span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold">Custom</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-3 flex-1">
                    <div className="text-sm text-muted-foreground border-b pb-3">
                      <div>• {plan.limits.outlets === 9999 ? 'Unlimited' : plan.limits.outlets} Outlet{plan.limits.outlets !== 1 ? 's' : ''}</div>
                      <div>• {plan.limits.users === 9999 ? 'Unlimited' : plan.limits.users} User{plan.limits.users !== 1 ? 's' : ''}</div>
                      <div>• {plan.limits.menuItems === 9999 ? 'Unlimited' : plan.limits.menuItems} Menu Items</div>
                    </div>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-6"
                    variant={index === 2 ? 'default' : 'outline'}
                    onClick={() => navigate('/signup')}
                  >
                    {plan.price > 0 ? 'Start Free Trial' : 'Contact Sales'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Restaurant Owners</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary via-primary to-primary/90 border-none text-primary-foreground">
            <CardContent className="p-8 md:p-12 text-center">
              <Shield className="h-16 w-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Restaurant?</h2>
              <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join 10,000+ restaurants already using our platform. Start your 14-day free trial today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate('/signup')}
                  className="gap-2"
                >
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/login')}
                  className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Talk to Sales
                </Button>
              </div>
              <p className="text-sm mt-6 opacity-75">No credit card required • Cancel anytime • 24/7 Support</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Utensils className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Restaurant POS</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Complete restaurant management solution for modern businesses.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 Restaurant POS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
