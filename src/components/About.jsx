import { motion } from 'framer-motion'
import { Database, Cloud, BarChart } from 'lucide-react'
import { useTranslation } from '../context/useTranslation'
import SectionWrapper from './SectionWrapper'
import AnimatedCard from './AnimatedCard'
import styles from './About.module.css'

const About = () => {
  const { t } = useTranslation()

  const highlights = [
    {
      icon: <Cloud size={32} />,
      title: t('Cloud Architecture'),
      description: t('Designing scalable cloud data systems on Azure')
    },
    {
      icon: <Database size={32} />,
      title: t('ETL Pipelines'),
      description: t('Building automated data pipelines and workflows')
    },
    {
      icon: <BarChart size={32} />,
      title: t('Analytics Dashboards'),
      description: t('Creating insights with Power BI and Tableau')
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
    <SectionWrapper id="about" variant="alternate">
      <div className={styles.about}>
        <motion.h2 
          className={styles.title}
          variants={titleVariants}
        >
          <span className={styles.gradient}>{t('About Me')}</span>
        </motion.h2>
        
        <motion.p 
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t("I'm a Business Information Systems student passionate about designing scalable cloud data systems, building automated ETL pipelines, and creating analytics dashboards that support data-driven decision making.")}
        </motion.p>

        <div className={styles.highlightsGrid}>
          {highlights.map((item, index) => (
            <AnimatedCard key={index} variant="glass" delay={index * 0.1}>
              <div className={styles.highlightCard}>
                <div className={styles.iconWrapper}>
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

export default About
