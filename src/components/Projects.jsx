import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import SectionWrapper from './SectionWrapper'
import AnimatedCard from './AnimatedCard'
import styles from './Projects.module.css'

const Projects = () => {
  const projects = [
    {
      title: 'Cloud Data Warehouse Architecture',
      description: 'Designed and implemented a scalable cloud data warehouse on Azure Synapse Analytics with optimized data models, partitioning strategies, and query performance tuning for handling large-scale analytics workloads.',
      tech: ['Azure Synapse', 'SQL', 'Data Modeling', 'Performance Tuning'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Azure ETL Pipeline Automation',
      description: 'Built automated ETL pipelines using Azure Data Factory and Databricks to process and transform data from multiple sources, with error handling, logging, and monitoring capabilities.',
      tech: ['Azure Data Factory', 'Databricks', 'PySpark', 'Python'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Power BI KPI Dashboard System',
      description: 'Created comprehensive Power BI dashboards for tracking key performance indicators across multiple business units, featuring interactive visualizations, drill-down capabilities, and real-time data refresh.',
      tech: ['Power BI', 'DAX', 'SQL', 'Data Visualization'],
      github: '#',
      demo: '#'
    },
    {
      title: 'E-commerce Data Analysis Platform',
      description: 'Developed end-to-end data analysis solution for e-commerce datasets using Python for data processing, SQL for database queries, and Power BI for visualization, delivering actionable business insights.',
      tech: ['Python', 'SQL', 'Power BI', 'Pandas', 'NumPy'],
      github: '#',
      demo: '#'
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
    <SectionWrapper id="projects" withSeparator>
      <div className={styles.projects}>
        <motion.h2 
          className={styles.title}
          variants={titleVariants}
        >
          Featured <span className={styles.gradient}>Projects</span>
        </motion.h2>
        
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <AnimatedCard key={index} variant="glass" delay={index * 0.15}>
              <div className={styles.projectCard}>
                <div className={styles.projectHeader}>
                  <h3>{project.title}</h3>
                  {/*
                  <div className={styles.projectLinks}>
                    <motion.a 
                      href={project.github}
                      className={styles.projectLink}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={20} />
                    </motion.a>
                    <motion.a 
                      href={project.demo}
                      className={styles.projectLink}
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  </div>
                  */}
                </div>
                
                <p className={styles.projectDescription}>
                  {project.description}
                </p>
                
                <div className={styles.techStack}>
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className={styles.techTag}>
                      {tech}
                    </span>
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

export default Projects
