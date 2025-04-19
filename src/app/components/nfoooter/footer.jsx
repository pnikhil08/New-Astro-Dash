import Link from 'next/link';
import styles from '@/app/components/nfoooter/foot.module.css';
import SupportChat from '@/app/UI/supportAPi/support';

const Footern = () => {
  return (
    <footer className={`${styles.footer} flex flex-col md:flex-row md:justify-between p-4`}>
      <div className="w-full text-center md:text-left">
        <p className={styles.dashFootP}>Copyright © 2023. Made with ❤️ by Dhwani Astro.</p>
      </div>
      <div className="mt-2 w-full md:mt-0">
        <ul className={`${styles.dashFootUl}`}>
          <li><Link href="#" className={styles.dashFA}>Cookies</Link></li>
          <li><Link href="#" className={styles.dashFA}>Terms & Conditions</Link></li>
          <li><Link href="#" className={styles.dashFA}>Privacy Policy</Link></li>
          <li><Link href="#" className={styles.dashFA}>Support</Link></li>
          {/* <SupportChat/> */}
        </ul>
      </div>
    </footer>
  );
};

export default Footern;
