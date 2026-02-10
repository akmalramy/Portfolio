import { motion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import TimelineItem from './TimelineItem'
import styles from './Experience.module.css'

const Experience = () => {
  const experiences = [
    {
      title: 'Data Engineering Microsoft Track',
      company: 'DEPI',
      location: 'Remote',
      period: '2024',
      responsibilities: [
        'Built secure cloud data architectures',
        'Developed ETL/ELT pipelines using Azure Data Factory, Databricks, PySpark, SQL',
        'Designed scalable Azure Synapse data warehouses',
        'Implemented data transformation and processing workflows'
      ]
    },
    {
      title: 'Data Analyst Intern',
      company: 'National Telecom Regulatory Authority',
      location: 'Cairo, Egypt',
      period: '2024',
      responsibilities: [
        'Analyzed large datasets using Excel & SQL',
        'Built Power BI dashboards for KPIs',
        'Created IoT business model research',
        'Delivered data-driven insights for decision making'
      ]
    },
    {
      title: 'HR Talent Acquisition',
      company: 'National Bank of Egypt',
      location: 'Cairo, Egypt',
      period: '2023',
      responsibilities: [
        'Built analytics dashboards supporting recruitment insights',
        'Conducted workforce analytics supporting accessibility initiatives',
        'Analyzed recruitment data to optimize hiring processes',
        'Created reports for HR management decision support'
      ]
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
    <SectionWrapper id="experience" variant="alternate">
      <div className={styles.experience}>
        <motion.h2 
          className={styles.title}
          variants={titleVariants}
        >
          Work <span className={styles.gradient}>Experience</span>
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
