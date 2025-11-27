import { Country } from 'country-state-city'

export interface CountryData {
  isoCode: string
  name: string
}

export function getCountries(): CountryData[] {
  const countries = Country.getAllCountries()
  return countries.map(country => ({
    isoCode: country.isoCode,
    name: country.name,
  }))
}
