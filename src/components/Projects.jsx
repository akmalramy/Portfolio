import React from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import SectionWrapper from './SectionWrapper'
import AnimatedCard from './AnimatedCard'
import styles from './Projects.module.css'




const Projects = () => {
  const projects = [
    {
      title: 'Olist E-Commerce Data Analysis | End-to-End BI Project',
      description: 'Delivered an end-to-end analysis of the 1.5M-row Olist E-Commerce dataset using Python, SQL Server, and Power BI. Built a clean relational database and star-schema model with advanced DAX measures, creating an interactive dashboard that identified logistics issues impacting customer satisfaction and retention.',
      tech: ['Python', 'Pandas', 'NumPy', 'SQL Server', 'T-SQL', 'Power BI', 'DAX', 'Data Modeling', 'Star Schema', 'ETL'],
      github: 'https://github.com/akmalramy/e-commerce-data-analysis',
    },
    {
      title: 'NBE Branch Analytics & Social Impact Strategy',
      description: 'Conducted analytical research on National Bank of Egypt branch distribution and social impact initiatives, focusing on youth engagement and PWD inclusion. Developed data-driven recommendations to support market expansion, strengthen brand positioning, and align with inclusion policies while linking insights to ROI, EVP, and long-term growth opportunities.',
      tech: ['Data Analysis', 'Business Strategy', 'Market Analysis', 'ROI Analysis', 'Social Impact Analytics'],
      demo: '../assets/docs/nbe_dashboard.png',
    },
    {
      title: 'Titanic Survival Insights (Exploratory Data Analysis)',
      description: 'Performed exploratory data analysis on the Titanic dataset to identify survival determinants through demographic segmentation, age binning, and ticket-price correlation analysis. Built statistical visualizations and an interactive dashboard to validate gender and passenger class as primary survival predictors.',
      tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly'],
      github: 'https://github.com/akmalramy/titanic-pyhton',
    },
    {
      title: 'Financial Performance & Revenue Analysis Dashboard',
      description: 'Developed an interactive financial analytics dashboard to monitor multi-currency revenue, expenses, and regional performance. Implemented time-series analysis and segmented reporting to identify revenue peaks, key growth drivers, and operational expense trends, enabling stakeholders to track performance exceeding $100M and support data-driven decisions.',
      tech: ['Power BI', 'Data Visualization', 'Financial Analysis', 'Time-Series Analysis'],
      demo: '../assets/docs/finance_dashboard.pdf',
    },
    {
      title: 'Power BI KPI Dashboard System',
      description: 'Created comprehensive Power BI dashboards for tracking key performance indicators across multiple business units, featuring interactive visualizations, drill-down capabilities, and real-time data refresh.',
      tech: ['Power BI', 'DAX', 'SQL', 'Data Visualization'],
    },
    {
      title: 'E-commerce Data Analysis Platform',
      description: 'Developed end-to-end data analysis solution for e-commerce datasets using Python for data processing, SQL for database queries, and Power BI for visualization, delivering actionable business insights.',
      tech: ['Python', 'SQL', 'Power BI', 'Pandas', 'NumPy'],
    },
    {
      title: 'University ERD Database System',
      description: 'Designed and implemented a normalized University Management database in SQL Server based on an ERD model. Built core academic entities with proper relationships, constraints, indexing, and performance optimization. Developed analytical queries and a stored procedure (sp_RunReports) to generate comprehensive administrative reports.',
      tech: ['SQL Server', 'T-SQL', 'Database Design', 'ERD Modeling', 'Stored Procedures', 'Indexing', 'Query Optimization'],
    },
  ];

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  const visibleProjects = projects;

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
          {visibleProjects.map((project, index) => (
            <AnimatedCard key={index} variant="glass" delay={index * 0.15}>
              <div className={styles.projectCard}>
                <div className={styles.projectHeader}>
                  <h3>{project.title}</h3>
                  <div className={styles.projectLinks}>
                    {project.github && (
                      <motion.a 
                        href={project.github}
                        className={styles.projectLink}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={20} />
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a 
                        href={project.demo}
                        className={styles.projectLink}
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.95 }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={20} />
                      </motion.a>
                    )}
                  </div>
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
        {/* See More button removed */}
      </div>
    </SectionWrapper>
  );
}


export default Projects;
