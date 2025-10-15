'use client';

import { useEffect, useRef } from 'react';
import styles from './Experience.module.css';

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string[];
  technologies: string[];
  logo: string;
}

const experiences: ExperienceItem[] = [
  {
    company: 'Company 1',
    role: 'Position/Role',
    period: 'Period/Duration',
    description: [
      'Bullet Point 1',
      'Bullet Point 2',
    ],
    technologies: ['Python', 'SQL', 'Git'],
    logo: '/link-to/image1.webp'
  },
  {
    company: 'Company 2',
    role: 'Position/Role',
    period: 'Period/Duration',
    description: [
      'Bullet Point 1',
      'Bullet Point 2',
    ],
    technologies: ['Angular', 'Typescript', 'Jest'],
    logo: '/link-to/image2.webp'
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    const currentItemRefs = itemRefs.current;

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

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    currentItemRefs.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
      currentItemRefs.forEach((item) => {
        if (item) {
          observer.unobserve(item);
        }
      });
    };
  }, []);

  return (
    <section id="experience" ref={sectionRef} className={styles.experience}>
      <div className={styles.container}>
        <h2 className={styles.title}>Experience</h2>
        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={styles.timelineItem}
            >
              <div className={styles.timelineContent}>
                <div className={styles.timelineHeader}>
                  <div className={styles.companyInfo}>
                    {/* Use if you have logo for where you worked*/}
                    {/* <div className={styles.logoWrapper}>
                      <Image
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        width={40}
                        height={40}
                        className={styles.logo}
                      />
                    </div> */}
                    <h3 className={styles.company}>{exp.company}</h3>
                  </div>
                  <span className={styles.period}>{exp.period}</span>
                </div>
                <h4 className={styles.role}>{exp.role}</h4>
                <ul className={styles.description}>
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className={styles.technologies}>
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className={styles.tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 