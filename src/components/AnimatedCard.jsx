import { motion } from 'framer-motion'
import styles from './AnimatedCard.module.css'

const AnimatedCard = ({ 
  children, 
  className = '', 
  variant = 'glass',
  delay = 0 
}) => {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <motion.div
      className={`${styles.card} ${styles[variant]} ${className}`}
      variants={cardVariants}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
    >
      <div className={styles.cardBorder} />
      <div className={styles.cardContent}>
        {children}
      </div>
    </motion.div>
  )
}

export default AnimatedCard
