import styles from '../../styles/Footer.module.scss';
import { Github, Linkedin, Twitter } from '../../utils/icons';
import { IconType } from 'react-icons';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <p>
        Made by{' '}
        <a href='https://github.com/aimanalishezan' target='_blank' rel='noreferrer'>
          <b>Aiman ali Shezan</b>
        </a>
      </p>
      <div>
        <a href='https://www.linkedin.com/in/md-aiman-ali-shezan-864568323/' className={styles.icon} target='_blank' rel='noreferrer'>
          <Linkedin />
        </a>
        <a href='' className={styles.icon} target='_blank' rel='noreferrer'>
          <Twitter />
        </a>
        <a href='https://github.com/aimanalishezan' className={styles.icon} target='_blank' rel='noreferrer'>
          <Github />
        </a>
      </div>
    </div>
  );
}
