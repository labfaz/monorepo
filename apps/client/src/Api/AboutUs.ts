import { strapi } from "Api"
import useFetchApi from "Hooks/useFetchApi"
import { Image } from 'Utils/Image'

export interface AboutUsData {
  banner_data: string,
  welcome_data: DataObject,
  about_us_data: DataObject[]
}

export interface DataObject {
  id: number,
  img: Image,
  text: string
}

export interface StaffObject {
  name: string,
  tag: string,
  text: string,
  image: Image,
}

export interface StaffData {
  staffs: StaffObject[]
}



export const fetchAboutUsData = () => strapi
  .get<AboutUsData>("/about-us-data")
  .then(({ data }) => data)
  .then(({ banner_data, welcome_data, about_us_data }) => ({
    banner_data,
    welcome_data,
    about_us_data
  }))

export const useAboutUsdata = () => useFetchApi<AboutUsData>('/about-us', fetchAboutUsData)


export const fetchStaffData = () => strapi
  .get<StaffData>("/some-url")
  .then(({data}) => data)


export const useStaffData = () => useFetchApi<StaffData>('/staff', fetchStaffData)
