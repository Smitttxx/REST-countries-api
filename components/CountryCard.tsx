import Image from "next/image";
import Link from "next/link";
import { CountryData } from "../interfaces/Country";
import { FormattedMessage } from "react-intl";

type CountryCardProps = {
  data: CountryData;
};

const CountryCard = ({ data }: CountryCardProps) => {
  return (
    <Link href={`/${data.alpha3Code}`}>
      <a>
        <article className="grid grid-rows-1">
          <div className="row-span-1">
            <Image
              height={160}
              width={264}
              src={data.flags.png}
              alt={`${data.name} flag`}
              className="row-span-2 rounded-t-md"
            />
          </div>
          <section className="row-span-1 space-y-6 rounded-b-md bg-element-light px-6 py-7 text-text-light dark:bg-element-dark dark:text-text-dark">
            <h2 className="text-lg font-extrabold">{data.name}</h2>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">
                  <FormattedMessage id="country.population" />
                </h3>
                <p>{data.population.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">
                  <FormattedMessage id="country.region" />
                </h3>
                <p>{data.region}</p>
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">
                  <FormattedMessage id="country.capital" />
                </h3>
                <p>{data.capital}</p>
              </div>
            </div>
          </section>
        </article>
      </a>
    </Link>
  );
};

export default CountryCard;
