'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './About.module.css';

const interests = [
  {
    title: 'Service',
    description: 'Serving my community and helping others through communities such as ColorStack',
    image: '/images/interests/service.jpg'
  },
//   {
//     title: 'Music',
//     description: 'Finding inspiration in different genres and artists',
//     image: '/images/interests/music.jpg'
//   },
  {
    title: 'Networking',
    description: 'Building connections and relationships with others',
    image: '/images/interests/networking.jpg'
  }
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % interests.length);
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % interests.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + interests.length) % interests.length);
    setIsAutoPlaying(false);
  };

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.title}>About Me</h2>
        <div className={styles.content}>
          <div className={styles.story}>
            <h3 className={styles.subtitle}>My Journey</h3>
            <p className={styles.text}>
              I currently attend Kennesaw State University, my passion for computers and for problem solving led me to choosing Software Engineering as a major.
            </p>
            <p className={styles.text}>
              Discuss your passion for technology and problem-solving. What have you learnt so far?
            </p>
          </div>
          <div className={styles.interests}>
            <h3 className={styles.subtitle}>Beyond Coding</h3>
            <div className={styles.carousel}>
              <button 
                className={`${styles.carouselButton} ${styles.prev}`}
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                ←
              </button>
              <div className={styles.carouselContent}>
                {interests.map((interest, index) => (
                  <div
                    key={index}
                    className={`${styles.carouselSlide} ${index === currentSlide ? styles.active : ''}`}
                  >
                    <div className={styles.carouselImage}>
                      <Image
                        src={interest.image}
                        alt={interest.title}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className={styles.carouselInfo}>
                      <h4>{interest.title}</h4>
                      <p>{interest.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                className={`${styles.carouselButton} ${styles.next}`}
                onClick={nextSlide}
                aria-label="Next slide"
              >
                →
              </button>
            </div>
            <div className={styles.carouselDots}>
              {interests.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
                  onClick={() => {
                    setCurrentSlide(index);
                    setIsAutoPlaying(false);
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className={styles.values}>
            <h3 className={styles.subtitle}>What I Value</h3>
            <div className={styles.valueGrid}>
              <div className={styles.value}>
                <h4>Continuous Learning</h4>
                <p>Always seeking to improve and stay current with technology</p>
              </div>
              <div className={styles.value}>
                <h4>Innovation</h4>
                <p>Finding creative solutions to complex problems</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 