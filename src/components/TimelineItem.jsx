import { motion } from 'framer-motion'
import { Calendar, MapPin, ExternalLink } from 'lucide-react'
import styles from './TimelineItem.module.css'

const TimelineItem = ({ 
  title, 
  company, 
  location, 
  period, 
  responsibilities, 
  link,
  index 
}) => {
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: index % 2 === 0 ? -50 : 50 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <motion.div 
      className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
      variants={itemVariants}
    >
      <div className={styles.timelineDot}>
        <div className={styles.dotInner} />
      </div>
      
      <div className={styles.timelineContent}>
        <div className={styles.timelineCard}>
          <div className={styles.cardHeader}>
            <h3>{title}</h3>
            {link ? (
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.companyLink}
              >
                <span>{company}</span>
                <ExternalLink size={15} className={styles.linkIcon} />
              </a>
            ) : (
              <p className={styles.company}>{company}</p>
            )}
          </div>
          
          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <Calendar size={16} />
              {period}
            </span>
            <span className={styles.metaItem}>
              <MapPin size={16} />
              {location}
            </span>
          </div>
          
          <ul className={styles.responsibilities}>
            {responsibilities.map((resp, idx) => {
              const colonIndex = resp.indexOf(': ')
              if (colonIndex !== -1 && colonIndex < 45) {
                const prefix = resp.substring(0, colonIndex)
                const rest = resp.substring(colonIndex + 1)
                return (
                  <li key={idx}>
                    <strong className={styles.bulletTitle}>{prefix}:</strong>
                    <span>{rest}</span>
                  </li>
                )
              }
              return <li key={idx}>{resp}</li>
            })}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export default TimelineItem
