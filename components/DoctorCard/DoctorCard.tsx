import { DoctorCardProps } from '@/types/types';
import styles from './DoctorCard.module.css';

const DoctorCard = ({ name, specialty, experience, rating, profile }: DoctorCardProps) => {
  return (
    <div className={styles.card}>
      <img
        src={profile}
        alt={name}
        className={styles.image}
      />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.specialty}>{specialty} · {experience} Years</p>
      <p className={styles.rating}>Ratings: {'⭐'.repeat(rating)}</p>
      <button className={styles.button}>Book Appointment</button>
    </div>
  );
};

export default DoctorCard;
