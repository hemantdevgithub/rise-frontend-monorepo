import { Button, Card, CardContent, CardHeader, CardTitle, Input } from "@repo/ui";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@repo/ui";
import { Textarea } from "@repo/ui";

const Contact = () => {
  const faqs = [
    {
      question: "How Can I Pay?",
      answer:
        "We accept various payment methods including credit cards, PayPal, and bank transfers. All payments are processed securely.",
    },
    {
      question: "What Is Process To Get Expert Team?",
      answer:
        "Our expert team assignment process involves evaluating your needs and matching you with the most qualified professionals in your required field.",
    },
    {
      question: "How Does Apply Online Services?",
      answer:
        "Simply fill out the contact form or select your desired service from our website. We'll guide you through the rest of the process.",
    },
  ];
  return (
    <div className="bg-white">
      <div className="mx-auto px-4">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          {/* Contact Form */}
          <Card className="bg-[#E8F3F0] shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Get In Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="tel"
                    placeholder="Phone"
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Email"
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Location"
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Write Message"
                    className="min-h-[120px] bg-gray-50"
                  />
                </div>
                <Button
                  className="w-full bg-teal-700 text-white hover:bg-teal-800"
                  size="lg"
                >
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="bg-[#E8F3F0] shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Frequently Asked Question
              </CardTitle>
              <p className="mt-2 text-2xl font-bold">Have Your Any Question?</p>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Button className="mt-6 bg-yellow-400 text-black hover:bg-yellow-500">
                Add Questions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
