import { motion } from 'framer-motion'
import { Download, Mail, MapPin, ArrowRight } from 'lucide-react'
import styles from './Hero.module.css'
import avatarImg from '../assets/images/pfp.jpg'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className={styles.badge} variants={itemVariants}>
            <span className={styles.badgeDot} />
            Available for opportunities
          </motion.div>
          
          <motion.h1 variants={itemVariants}>
            Hi, I'm <span className={styles.gradient}>Akmal Ramy</span>
          </motion.h1>
          
          <motion.h2 className={styles.subtitle} variants={itemVariants}>
            Junior Data Engineer
          </motion.h2>
          
          <motion.div className={styles.location} variants={itemVariants}>
            <MapPin size={18} />
            <span>Cairo, Egypt</span>
          </motion.div>
          
          <motion.p className={styles.description} variants={itemVariants}>
            I specialize in building scalable cloud data architectures, 
            ETL pipelines, and analytics dashboards using Azure, Python, SQL, and Power BI.
          </motion.p>
          
          <motion.div className={styles.actions} variants={itemVariants}>
            <motion.a 
              href="#projects" 
              className={styles.btnPrimary}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
              <ArrowRight size={20} />
            </motion.a>
            
            <motion.a 
              href="#contact" 
              className={styles.btnSecondary}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={20} />
              Contact Me
            </motion.a>
            
            <motion.a 
              href="../assets/docs/Akmal_Ramy_CV.pdf" 
              download 
              className={styles.btnOutline}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
              Download CV
            </motion.a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className={styles.visual}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
              <img src={avatarImg} alt="Akmal Ramy" className={styles.avatarImg} />
            </div>
            <motion.div 
              className={styles.ring}
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            <motion.div 
              className={styles.ringOuter}
              animate={{ 
                rotate: -360,
                scale: [1, 1.15, 1]
              }}
              transition={{ 
                rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
              }}
            />
          </div>
          
          <div className={styles.floatingElements}>
            <motion.div 
              className={styles.floatingItem}
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span>☁️</span>
            </motion.div>
            <motion.div 
              className={styles.floatingItem}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <span>📊</span>
            </motion.div>
            <motion.div 
              className={styles.floatingItem}
              animate={{ y: [0, -25, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <span>🗄️</span>
            </motion.div>
          </div>
        </motion.div>
      </div>      
    </section>
  )
}

export default Hero
