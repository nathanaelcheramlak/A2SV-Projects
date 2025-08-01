import { useForm } from "react-hook-form";
import "./ContactForm.css";

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    alert("Message sent!");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
      <h2>Contact Us</h2>

      <label>Name</label>
      <input
        type="text"
        {...register("name", { required: "Name is required" })}
      />
      {errors.name && <p className="error">{errors.name.message as string}</p>}

      <label>Email</label>
      <input
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email address",
          },
        })}
      />
      {errors.email && (
        <p className="error">{errors.email.message as string}</p>
      )}

      <label>Message</label>
      <textarea
        {...register("message", { required: "Message is required" })}
      ></textarea>
      {errors.message && (
        <p className="error">{errors.message.message as string}</p>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export default ContactForm;
