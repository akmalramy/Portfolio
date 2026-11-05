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
        t('Enterprise Data Architecture: Resolved severe data silos and complex Many-to-Many relationship ambiguities between fragmented datasets. Engineered a robust Galaxy Schema in Power BI by building centralized master dictionaries, successfully creating a unified, single-source-of-truth data model.'),
        t('Digital Workflow Automation: Led the transition from manual reporting bottlenecks to automated digital intake forms for Fleet operations. This modernization ensured secure, instant database updates and guaranteed clean, standardized data for downstream executive analytics.'),
        t('Executive-Level Business Intelligence: Designed and deployed an interactive, dark-themed Power BI dashboard tailored specifically for government leadership. Integrated high-level KPI ribbons and dynamic cross-filtering to provide non-technical stakeholders with instant visibility into operational readiness and resource stability.'),
        t('Strategic Value Delivery & Leadership: Translated complex backend data engineering into actionable business impact by structuring and delivering a comprehensive C-suite executive presentation. Selected to shoot the official closing video representing the cohort\'s journey and impact.')
      ]
    },
    {
      title: t('HR Learning And Development Analyst Intern'),
      company: t('National Bank of Egypt (NBE)'),
      location: t('Cairo, Egypt · Hybrid'),
      period: t('JUL 2026 - AUG 2026'),
      link: 'https://www.linkedin.com/company/393986/',
      responsibilities: [
        t('Data-Driven L&D Redesign: Analyzed mid-year workforce metrics, identifying a severe operational bottleneck (134 physical programs vs. 35 e-learning). Restructured this into a 2-Day Flipped Learning Model (Digital LMS theory + physical practical simulations).'),
        t('Operational Continuity: The new model managed 211,800+ annual training opportunities while eliminating travel logistics, minimizing employee burnout, and safely protecting 75% of branch operational capacity at all times.'),
        t('Zero-Cost Talent Acquisition: Maximized the ROI of 11 regional training hubs by proposing strategic partnerships with MCIT (DEPI) and regional universities. By hosting bootcamps during off-peak hours, we created an active, zero-cost scouting pipeline for top-tier tech and business talent.'),
        t('SLA Metric Optimization: Re-engineered the "Ask HR" support framework by implementing business-hour timer logic (pausing over weekends) and deploying dynamic FAQ triage, ensuring highly accurate performance metrics and eliminating artificial SLA breaches.')
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
