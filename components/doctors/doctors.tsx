"use client";
import { useEffect, useState } from "react";
import DoctorCard from "../DoctorCard/DoctorCard";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./DoctorPage.module.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Doctor } from "@/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import DoctorSkeleton from "../skeleton/DoctorSkeleton";

const Doctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const [query, setQuery] = useState<string>("");
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const query = searchParams.get("search") || "";

  const fetchDoctors = async (searchQuery = "") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/doctors`,
        {
          params: searchQuery ? { search: searchQuery } : {},
        }
      );
      setDoctors(response?.data?.data?.doctors);
    } catch (error) {
      toast.error("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors(query);
  }, [query]);

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleFilterChange = (filters: any) => {
    
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.mainHeading}>Find a doctor at your own ease</h2>

      <div className={styles.searchBarWrapper}>
        <SearchBar onSearch={handleSearch} />
      </div>

      <h3 className={styles.subHeading}>{doctors?.length} {doctors?.length < 2 ? "doctor" : "doctors"} available</h3>
      <p className={styles.description}>
        Book appointments with minimum wait-time & verified doctor details
      </p>

      <div className={styles.contentWrapper}>
        <aside className={styles.sidebar}>
          <FilterSidebar onFilterChange={handleFilterChange} />
        </aside>

        <section className={styles.doctorSection}>
          <div className={styles.doctorGrid}>
            {loading && Array.from({ length: 6 }).map((_, index) => <DoctorSkeleton key={index} />)}
            {!loading && doctors?.length === 0 && <p>No doctors found</p>}
            {!loading &&
              doctors?.length > 0 &&
              doctors.map((doctor, index) => (
                <DoctorCard key={index} {...doctor} />
              ))}
          </div>

          <div className={styles.paginationWrapper}>
            <button className={styles.paginationBtn}>&laquo; Prev</button>
            {Array.from({ length: 3 }).map((_, index) => (
              <button key={index} className={styles.paginationBtn}>
                {index + 1}
              </button>
            ))}
            <span className={styles.paginationEllipsis}>...</span>
            <button className={styles.paginationBtn}>Next &raquo;</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Doctors;
