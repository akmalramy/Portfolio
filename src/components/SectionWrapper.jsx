import { motion } from 'framer-motion'
import styles from './SectionWrapper.module.css'

const SectionWrapper = ({ 
  id, 
  children, 
  className = '', 
  variant = 'default',
  withSeparator = false 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  return (
    <section id={id} className={`${styles.section} ${styles[variant]} ${className}`}>
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {children}
      </motion.div>
      
      {withSeparator && (
        <div className={styles.separator}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 Q300,80 600,40 T1200,0 L1200,120 L0,120 Z" fill="var(--color-bg)" />
          </svg>
        </div>
      )}
    </section>
  )
}

export default SectionWrapper
