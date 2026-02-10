import { motion } from 'framer-motion'
import { GraduationCap, Calendar, BookOpen } from 'lucide-react'
import SectionWrapper from './SectionWrapper'
import AnimatedCard from './AnimatedCard'
import styles from './Education.module.css'

const Education = () => {
  const coursework = [
    'Database Management Systems',
    'Data Analytics',
    'Business Intelligence',
    'Cloud Computing',
    'Information Systems',
    'Data Structures'
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
    <SectionWrapper id="education" variant="alternate">
      <div className={styles.education}>
        <motion.h2 
          className={styles.title}
          variants={titleVariants}
        >
          <span className={styles.gradient}>Education</span>
        </motion.h2>
        
        <AnimatedCard variant="glass">
          <div className={styles.educationCard}>
            <div className={styles.iconSection}>
              <div className={styles.iconWrapper}>
                <GraduationCap size={48} />
              </div>
            </div>
            
            <div className={styles.content}>
              <h3>Bachelor of Business Information Systems</h3>
              <p className={styles.university}>
                Galala University powered by Arizona State University
              </p>
              
              <div className={styles.meta}>
                <span className={styles.metaItem}>
                  <Calendar size={16} />
                  Expected Graduation: July 2027
                </span>
              </div>
              
              <div className={styles.coursework}>
                <div className={styles.courseworkHeader}>
                  <BookOpen size={20} />
                  <h4>Relevant Coursework</h4>
                </div>
                <div className={styles.courseworkGrid}>
                  {coursework.map((course, index) => (
                    <motion.div
                      key={index}
                      className={styles.courseItem}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 5 }}
                    >
                      <span className={styles.courseDot}>▸</span>
                      {course}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </SectionWrapper>
  )
}

export default Education
