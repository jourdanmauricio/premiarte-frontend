import { ContactForm } from "./ContactForm";

const ContactPage = () => {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12 mx-auto">
      <div className="mb-8 max-w-[1200px] mx-auto">
        <h1 className="font-montserrat mb-8 text-3xl font-semibold text-orange-500">
          Contáctanos
        </h1>
        <p className="text-gray-200 text-lg mb-8">
          Escríbenos tu consulta y te responderemos a la brevedad. Si necesitas
          un presupuesto de forma inmediata, también puedes contactarnos
          directamente por WhatsApp o agregando los productos deseados a tu
          carrito.
        </p>
      </div>
      <ContactForm />
    </div>
  );
};

export { ContactPage };
