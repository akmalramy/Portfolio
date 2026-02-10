import { motion } from 'framer-motion'
import { Code, Database, BarChart3, Cloud } from 'lucide-react'
import SectionWrapper from './SectionWrapper'
import AnimatedCard from './AnimatedCard'
import styles from './Skills.module.css'

const Skills = () => {
  const skillCategories = [
    {
      icon: <Code size={28} />,
      title: 'Programming',
      skills: ['Python', 'SQL', 'HTML', 'CSS']
    },
    {
      icon: <Cloud size={28} />,
      title: 'Cloud & ETL',
      skills: ['Azure Data Factory', 'Azure Synapse Analytics', 'Databricks (PySpark)']
    },
    {
      icon: <BarChart3 size={28} />,
      title: 'Analytics & BI',
      skills: ['Power BI', 'Tableau', 'Excel']
    },
    {
      icon: <Database size={28} />,
      title: 'Databases',
      skills: ['MySQL', 'SQL Server', 'Data Warehousing']
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
    <SectionWrapper id="skills" withSeparator>
      <div className={styles.skills}>
        <motion.h2 
          className={styles.title}
          variants={titleVariants}
        >
          Skills & <span className={styles.gradient}>Technologies</span>
        </motion.h2>
        
        <div className={styles.skillsGrid}>
          {skillCategories.map((category, index) => (
            <AnimatedCard key={index} variant="elevated" delay={index * 0.1}>
              <div className={styles.skillCard}>
                <div className={styles.iconWrapper}>
                  {category.icon}
                </div>
                <h3>{category.title}</h3>
                <div className={styles.skillTags}>
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span 
                      key={skillIndex}
                      className={styles.tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index * 0.1) + (skillIndex * 0.05) }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Skills
