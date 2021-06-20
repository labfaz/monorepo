import { api } from "Api"
import useFetchApi from "Hooks/useFetchApi"

export interface AboutUsData {
  bannerData: string,
  mainData: DataObject,
  secondaryData: DataObject[]
}

interface DataObject {
  img: string,
  txt: string
}

export const fetchAboutUsData = () => api
  .get<AboutUsData>("/about-us")
  .then(({ data }) => data)

export const useAboutUsdata = () => useFetchApi<AboutUsData>('/about-us', fetchAboutUsData)
