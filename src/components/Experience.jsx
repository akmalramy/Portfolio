import { motion } from 'framer-motion'
import { useTranslation } from '../context/useTranslation'
import SectionWrapper from './SectionWrapper'
import TimelineItem from './TimelineItem'
import styles from './Experience.module.css'

const Experience = () => {
  const { t } = useTranslation()

  const experiences = [
    {
      title: t('Analytics Engineer - Institutional Quality Management'),
      company: t('Information and Decision Support Center (IDSC)'),
      location: t('Cairo, Egypt · Hybrid'),
      period: t('AUG 2026 - OCT 2026'),
      link: 'https://www.linkedin.com/company/10570079/',
      responsibilities: [
        t('Engineered a Power BI Galaxy Schema resolving data silos and complex relationships'),
        t('Automated Fleet operations intake workflows to ensure clean, instant data updates'),
        t('Built an interactive executive Power BI dashboard with KPI ribbons and cross-filtering'),
        t('Delivered C-suite executive presentations translating data into operational strategy')
      ]
    },
    {
      title: t('HR Learning And Development Analyst Intern'),
      company: t('National Bank of Egypt (NBE)'),
      location: t('Cairo, Egypt · Hybrid'),
      period: t('JUL 2026 - AUG 2026'),
      link: 'https://www.linkedin.com/company/393986/',
      responsibilities: [
        t('Redesigned L&D workflows into a 2-Day Flipped Learning model via workforce analytics'),
        t('Managed 211,800+ annual training seats while safeguarding branch operational capacity'),
        t('Formed strategic partnerships with MCIT (DEPI) and universities for regional talent scouting'),
        t('Optimized "Ask HR" SLA metrics using business-hour timers and dynamic FAQ triage')
      ]
    },
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
