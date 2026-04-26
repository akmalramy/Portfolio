import React, { createContext, useState, useEffect } from 'react'
import phraseTranslations from '../phraseTranslations.json'

export const TranslationContext = createContext()

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')
  const [translations, setTranslations] = useState(phraseTranslations)

  // Load language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en'
    setLanguage(savedLanguage)
    document.documentElement.lang = savedLanguage
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr'
  }, [])

  // Toggle language and update document
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en'
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
    document.documentElement.lang = newLanguage
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr'
  }

  // Translation function
  const t = (text) => {
    if (language === 'en') return text
    return translations[text] || text
  }

  return (
    <TranslationContext.Provider value={{ language, translations, t, toggleLanguage }}>
      {children}
    </TranslationContext.Provider>
  )
}
