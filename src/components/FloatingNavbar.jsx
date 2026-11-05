import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, Globe } from 'lucide-react'
import { useTranslation } from '../context/useTranslation'
import styles from './FloatingNavbar.module.css'

const FloatingNavbar = ({ darkMode, toggleDarkMode }) => {
  const { language, toggleLanguage, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const isRtl = language === 'ar'

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Detect active section
      const sections = navItems.map(item => item.href.substring(1))
      const scrollPosition = window.scrollY + 120
      
      for (let section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <motion.nav 
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className={styles.container}>
        <motion.a 
          href="#home" 
          className={styles.logo}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className={styles.logoText}>AR</span>
          <div className={styles.logoAccent} />
        </motion.a>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`${styles.navLink} ${activeSection === item.href.substring(1) ? styles.active : ''}`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {t(item.name)}
                {activeSection === item.href.substring(1) && (
                  <motion.div 
                    className={styles.activeIndicator}
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          <div className={styles.navDivider} />

          <div className={styles.navActions}>
            <motion.button
              onClick={toggleLanguage}
              className={styles.languageToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle language"
              title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            >
              <Globe size={16} />
              <span className={styles.languageLabel}>{language.toUpperCase()}</span>
            </motion.button>
            
            <motion.button
              onClick={toggleDarkMode}
              className={styles.themeToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className={styles.mobileControls}>
          <motion.button
            onClick={toggleLanguage}
            className={styles.languageToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle language"
            title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
          >
            <Globe size={16} />
            <span className={styles.languageLabel}>{language.toUpperCase()}</span>
          </motion.button>
          
          <motion.button
            onClick={toggleDarkMode}
            className={styles.themeToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
          
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.menuButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.aside
              className={styles.sidebar}
              initial={{ x: isRtl ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '100%' : '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
            >
              <div className={styles.sidebarHeader}>
                <a href="#home" className={styles.logo} onClick={() => setIsOpen(false)}>
                  <span className={styles.logoText}>AR</span>
                  <div className={styles.logoAccent} />
                </a>
                <button className={styles.menuButton} onClick={() => setIsOpen(false)} aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>

              <nav className={styles.sidebarNav}>
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`${styles.mobileNavLink} ${activeSection === item.href.substring(1) ? styles.active : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {t(item.name)}
                  </a>
                ))}
              </nav>

              <div className={styles.sidebarFooter}>
                <motion.button 
                  onClick={toggleLanguage} 
                  className={styles.languageToggle} 
                  aria-label="Toggle language"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Globe size={16} />
                  <span>{language.toUpperCase()}</span>
                </motion.button>
                
                <button onClick={toggleDarkMode} className={styles.themeToggle} aria-label="Toggle dark mode">
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default FloatingNavbar
