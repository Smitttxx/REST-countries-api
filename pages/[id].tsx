import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { CountryData } from "../interfaces/Country";
import CountryDetailsCard from "../components/CountryDetailsCard";
import { FormattedMessage } from "react-intl";

export interface CountryDetails extends CountryData {
  nativeName: string;
  subregion: string;
  topLevelDomain: string[];
  languages: {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
  }[];
  currencies: { code: string; name: string; symbol: string }[];
  borders: string[];
}

export interface BorderCountries {
  name: string;
  alpha3Code: string;
}

const DetailsPage: NextPage<{
  country: CountryDetails;
  borderCountries: BorderCountries[];
}> = ({ country, borderCountries }) => {
  const router = useRouter();
  return (
    <>
      <button
        type="button"
        className="flex items-center gap-2 rounded-md bg-element-light px-8 py-2 text-sm text-text-light shadow-lg dark:bg-element-dark dark:text-text-dark"
        onClick={() => router.back()}
      >
        <ArrowNarrowLeftIcon className="h-5 w-5" />
        <FormattedMessage id="app.backButton" />
      </button>
      <CountryDetailsCard country={country} borderCountries={borderCountries} />
    </>
  );
};

export default DetailsPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(process.env.API_BASE + "all?fields=alpha3Code");
  const countries = await res.json();

  const paths = countries.map((country: { alpha3Code: string }) => ({
    params: { id: country.alpha3Code },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) throw new Error("route id param is not defined");

  const mainRes = await fetch(
    `${process.env.API_BASE}alpha/${params.id}?fields=alpha3Code,nativeName,name,population,region,subregion,capital,topLevelDomain,languages,currencies,flags,borders`
  );
  const country: CountryDetails = await mainRes.json();

  console.log(country);

  const bordersRes = await fetch(
    `${process.env.API_BASE}alpha?codes=${country.borders.join(
      ","
    )}&fields=name,alpha3Code`
  );
  const borderCountries = await bordersRes.json();

  return {
    props: { country, borderCountries },
  };
};
