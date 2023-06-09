import { SearchIcon } from "@heroicons/react/outline";
import type { GetStaticProps, NextPage } from "next";
import type { CountryData } from "../interfaces/Country";
import React, { useState } from "react";
import CountryCard from "../components/CountryCard";
import { ChevronDownIcon } from "@heroicons/react/solid";
import ClickAwayListener from "react-click-away-listener";
import Head from "next/head";

const Home: NextPage<{ countries: CountryData[] }> = ({ countries }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFitler] = useState("");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  // TODO - Look into i18n solution for this
  const regions = [
    "none",
    "africa",
    "americas",
    "asia",
    "europe",
    "oceania",
    "polar",
  ];

  const filteredCountries =
    regionFilter === ""
      ? countries
      : countries.filter(
          (country) => country.region.toLowerCase() === regionFilter
        );

  const searchedCountries =
    searchQuery === ""
      ? filteredCountries
      : filteredCountries.filter((country) =>
          country.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const toggleFilterMenu = () => setFilterMenuOpen((c) => !c);
  const closeFilterMenu = () => setFilterMenuOpen(false);

  const handleRegionFilterSelect = (region: string) => {
    if (region === "none") setRegionFitler("");
    else setRegionFitler(region);

    closeFilterMenu();
  };

  const cardList = searchedCountries.map((country) => (
    <li key={country.alpha3Code}>
      <CountryCard data={country} />
    </li>
  ));

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value);
  };

  return (
    <>
      <Head>
        <title>Lets Travel!</title>
      </Head>
      <div className="flex w-full flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="flex items-center gap-4 rounded-md bg-element-light px-8 py-4 text-input-light dark:bg-element-dark dark:text-text-dark lg:w-1/4">
          <SearchIcon className="h-6 w-6" />
          <input
            type="text"
            placeholder="where do we want to go?"
            className="w-full bg-transparent text-sm outline-none placeholder:text-input-light dark:placeholder:text-text-dark"
            value={searchQuery}
            onChange={handleSearchInput}
          />
        </div>
        {/* Filter select */}
        <ClickAwayListener onClickAway={closeFilterMenu}>
          <div className="relative w-[208px]">
            <button
              type="button"
              className="flex w-[208px] items-center justify-between gap-8 rounded-md bg-element-light py-4 pl-8 pr-6 text-sm text-text-light dark:bg-element-dark dark:text-text-dark"
              onClick={toggleFilterMenu}
            >
              <span className={`${regionFilter !== "" && "capitalize"}`}>
                {regionFilter === "" ? "Filter by Region" : regionFilter}
              </span>
              <ChevronDownIcon className="h-5 w-5" />
            </button>
            {filterMenuOpen && (
              <ul className="absolute left-0 z-10 mt-1 w-full rounded-md bg-element-light p-2 dark:bg-element-dark">
                {regions.map((region) => (
                  <li
                    key={region}
                    className={`${
                      region === "none" && "opacity-50"
                    } cursor-pointer rounded-md py-2 px-4 capitalize hover:bg-background-light dark:hover:bg-[#24313d]`}
                    onClick={() => handleRegionFilterSelect(region)}
                  >
                    {region}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </ClickAwayListener>
      </div>
      <ul className="xl:grid-cols-43 xl:grid-cols-43 mt-8 grid grid-cols-1 items-center justify-items-center gap-8 md:grid-cols-2 lg:mt-11 lg:grid-cols-3 xl:grid-cols-4">
        {cardList}
      </ul>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    process.env.API_BASE +
      "all?fields=alpha3Code,name,flags,population,region,capital"
  );
  const data = await res.json();

  return {
    props: {
      countries: data,
    },
  };
};
