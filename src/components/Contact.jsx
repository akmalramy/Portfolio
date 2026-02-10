import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin, Send } from 'lucide-react'
import SectionWrapper from './SectionWrapper'
import AnimatedCard from './AnimatedCard'
import styles from './Contact.module.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for your message! I will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }


  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: 'akmallramy@gmail.com',
      href: 'mailto:akmallramy@gmail.com'
    },
    {
      icon: <Phone size={24} />,
      label: 'Phone',
      value: '+20 11 55660358',
      href: 'tel:+201155660358'
    },
    {
      icon: <Linkedin size={24} />,
      label: 'LinkedIn',
      value: 'https://www.linkedin.com/in/akmal-ramy',
      href: 'https://www.linkedin.com/in/akmal-ramy'
    }
  ]

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <SectionWrapper id="contact" withSeparator>
      <div className={styles.contact}>
        <motion.h2 
          className={styles.title}
          variants={titleVariants}
        >
          Get In <span className={styles.gradient}>Touch</span>
        </motion.h2>
        
        <div className={styles.grid}>
          <AnimatedCard variant="glass" delay={0}>
            <div className={styles.infoCard}>
              <h3>Contact Information</h3>
              <p className={styles.subtitle}>
                I'm always open to discussing new opportunities, collaborations, 
                or just having a chat about data engineering.
              </p>
              
              <div className={styles.contactList}>
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target={item.label === 'LinkedIn' ? '_blank' : undefined}
                    rel={item.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                    className={styles.contactItem}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <div className={styles.contactIcon}>
                      {item.icon}
                    </div>
                    <div className={styles.contactDetails}>
                      <span className={styles.contactLabel}>{item.label}</span>
                      <span className={styles.contactValue}>{item.value}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard variant="glass" delay={0.2}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="Your Name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="akmallramy@gmail.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className={`${styles.input} ${styles.textarea}`}
                  placeholder="Your message..."
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className={styles.submitButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Send Message</span>
                <Send size={20} />
              </motion.button>
            </form>
          </AnimatedCard>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Contact
