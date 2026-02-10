import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import styles from './Footer.module.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <Github size={20} />, href: 'https://github.com/akmalramy', label: 'GitHub' },
    { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/akmal-ramy/', label: 'LinkedIn' },
    { icon: <Mail size={20} />, href: 'mailto:akmallramy@gmail.com', label: 'Email' },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.socialLinks}>
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target={link.label !== 'Email' ? '_blank' : undefined}
                rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                className={styles.socialLink}
                aria-label={link.label}
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          <div className={styles.copyright}>
            <p className={styles.year}>&copy; {currentYear} Akmal Ramy. All rights reserved.</p>
          </div>
        </div>

        <div className={styles.decoration}>
          <div className={styles.decorationLine}></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
