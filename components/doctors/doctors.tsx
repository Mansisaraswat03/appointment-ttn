"use client"
import DoctorCard from '../DoctorCard/DoctorCard';
import FilterSidebar from '../FilterSidebar/FilterSidebar';
import SearchBar from '../SearchBar/SearchBar';
import styles from './DoctorPage.module.css';

const doctors = [
  {
    name: 'Dr Jane Doe, MBBS',
    specialty: 'Dentist',
    experience: '9',
    rating: 5,
    image: '/images/d1.png',
  },
  {
    name: 'Dr Sam Wilson, BDS',
    specialty: 'Dentist',
    experience: '5',
    rating: 5,
    image: '/images/d1.png',
  },
  {
    name: 'Dr Pepper Potts, BHMS',
    specialty: 'Dentist',
    experience: '5',
    rating: 5,
    image: '/images/d1.png',
  },
  {
    name: 'Dr Tony Stark, MDS',
    specialty: 'Dentist',
    experience: '10',
    rating: 4,
    image: '/images/d1.png',
  },
  {
    name: 'Dr Meghan, MD',
    specialty: 'Dentist',
    experience: '3',
    rating: 5,
    image: '/images/d1.png',
  },
  {
    name: 'Dr Dev Patel, FNB',
    specialty: 'Dentist',
    experience: '6',
    rating: 4,
    image: '/images/d1.png',
  },
];

const Doctors = () => {
  const handleSearch = (term: string) => {
    console.log('Searching for:', term);
  };

  const handleFilterChange = (filters: any) => {
    console.log('Filters applied:', filters);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.mainHeading}>Find a doctor at your own ease</h2>
      
      <div className={styles.searchBarWrapper}>
        <SearchBar onSearch={handleSearch} />
      </div>

      <h3 className={styles.subHeading}>6 doctors available</h3>
      <p className={styles.description}>
        Book appointments with minimum wait-time & verified doctor details
      </p>

      <div className={styles.contentWrapper}>
        <aside className={styles.sidebar}>
          <FilterSidebar onFilterChange={handleFilterChange} />
        </aside>

        <section className={styles.doctorSection}>
          <div className={styles.doctorGrid}>
            {doctors.map((doctor, index) => (
              <DoctorCard key={index} {...doctor} />
            ))}
          </div>

          <div className={styles.paginationWrapper}>
            <button className={styles.paginationBtn}>&laquo; Prev</button>
           {
                Array.from({ length: 3 }).map((_, index) => (
                <button key={index} className={styles.paginationBtn}>{index + 1}</button>
                ))
           }
            <span className={styles.paginationEllipsis}>...</span>
            <button className={styles.paginationBtn}>Next &raquo;</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Doctors;
