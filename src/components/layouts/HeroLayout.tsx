import styles from './HeroLayout.module.css';

interface HeroLayoutProps {
  children: React.ReactNode;
}

export function HeroLayout({ children }: HeroLayoutProps) {
  return <div className={styles.hero}>{children}</div>;
}
