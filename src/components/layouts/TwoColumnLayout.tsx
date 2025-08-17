import styles from './TwoColumnLayout.module.css';

interface TwoColumnLayoutProps {
  children: React.ReactNode;
}

export function TwoColumnLayout({ children }: TwoColumnLayoutProps) {
  return <div className={styles.twoColumn}>{children}</div>;
}
