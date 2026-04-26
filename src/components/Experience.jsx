import { motion } from 'framer-motion'
import { useTranslation } from '../context/useTranslation'
import SectionWrapper from './SectionWrapper'
import TimelineItem from './TimelineItem'
import styles from './Experience.module.css'

const Experience = () => {
  const { t } = useTranslation()

  const experiences = [
    {
      title: t('Data Engineering Microsoft Track'),
      company: t('DEPI'),
      location: t('Remote'),
      period: t('NOV 2025 - Present'),
      responsibilities: [
        t('Built secure cloud data architectures'),
        t('Developed ETL/ELT pipelines using Azure Data Factory, Databricks, PySpark, SQL'),
        t('Designed scalable Azure Synapse data warehouses'),
        t('Implemented data transformation and processing workflows')
      ]
    },
    {
      title: t('HR Talent Acquisition'),
      company: t('National Bank of Egypt'),
      location: t('Cairo, Egypt'),
      period: t('JUL 2025 - AUG 2025'),
      responsibilities: [
        t('Built analytics dashboards supporting recruitment insights'),
        t('Conducted workforce analytics supporting accessibility initiatives'),
        t('Analyzed recruitment data to optimize hiring processes'),
        t('Created reports for HR management decision support')
      ]
    },
    {
      title: t('Data Analyst Intern'),
      company: t('National Telecom Regulatory Authority'),
      location: t('Cairo, Egypt'),
      period: t('JUL 2024 - AUG 2024'),
      responsibilities: [
        t('Analyzed large datasets using Excel & SQL'),
        t('Built Power BI dashboards for KPIs'),
        t('Created IoT business model research'),
        t('Delivered data-driven insights for decision making')
      ]
    },
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
    <SectionWrapper id="experience" variant="alternate">
      <div className={styles.experience}>
        <motion.h2 
          className={styles.title}
          variants={titleVariants}
        >
          <span className={styles.gradient}>{t('Work Experience')}</span>
        </motion.h2>
        
        <div className={styles.timeline}>
          <div className={styles.timelineLine} />
          {experiences.map((exp, index) => (
            <TimelineItem key={index} {...exp} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Experience
