import Link from "next/link";
import { FormattedMessage } from "react-intl";
import { CountryDetails, BorderCountries } from "../pages/[id]";
import Image from "next/image";

type CountryDetailsProps = {
  country: CountryDetails;
  borderCountries: BorderCountries[];
};

const CountryDetailsCard = ({
  country,
  borderCountries,
}: CountryDetailsProps) => {
  return (
    <div className="mt-20 grid grid-cols-1 md:grid-cols-2">
      <div>
        <Image
          width={560}
          height={400}
          quality={100}
          src={country.flags.png}
          alt={`${country.name} flag`}
          className="max-w-[400px]"
        />
      </div>
      <section className="my-10 flex flex-col gap-9">
        {/* Heading - Country name */}
        <h2 className="text-2xl font-extrabold">{country.name}</h2>
        <div className="flex flex-col gap-10 text-sm lg:flex-row lg:gap-40">
          {/* Left / Top detail section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">
                <FormattedMessage id="country.nativeName" />
              </h3>
              <p>{country.nativeName}</p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">
                <FormattedMessage id="country.population" />
              </h3>
              <p>{country.population.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">
                <FormattedMessage id="country.region" />
              </h3>
              <p>{country.region}</p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">
                <FormattedMessage id="country.subRegion" />
              </h3>
              <p>{country.subregion}</p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">
                <FormattedMessage id="country.capital" />
              </h3>
              <p>{country.capital}</p>
            </div>
          </div>
          {/* Right / Bottom detail section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">
                <FormattedMessage id="country.topLevelDomain" />
              </h3>
              {country.topLevelDomain.map((domain) => (
                <p key={domain}>{domain}</p>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">
                <FormattedMessage id="country.currencies" />
              </h3>
              {country.currencies.map((currency, i) => (
                <p key={currency.code}>
                  {currency.name}
                  {country.currencies.length > 1 &&
                    i + 1 < country.currencies.length &&
                    ","}
                </p>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">
                <FormattedMessage id="country.languages" />:
              </h3>
              {country.languages.map((language, i) => (
                <p key={language.iso639_2}>
                  {language.name}
                  {country.languages.length > 1 &&
                    i + 1 < country.languages.length &&
                    ","}
                </p>
              ))}
            </div>
          </div>
        </div>
        {/* Border countries */}
        <div className="flex flex-col gap-4 text-sm lg:flex-row lg:items-center">
          <h3 className="font-semibold">Border Countries:</h3>
          <ul className="flex flex-wrap gap-3">
            {borderCountries.length > 1 &&
              borderCountries?.map((border) => (
                <Link href={`/${border.alpha3Code}`} key={border.alpha3Code}>
                  <a>
                    <li className="rounded bg-element-light px-6 py-1 text-text-light shadow dark:bg-element-dark dark:text-text-dark">
                      {border.name}
                    </li>
                  </a>
                </Link>
              ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CountryDetailsCard;
