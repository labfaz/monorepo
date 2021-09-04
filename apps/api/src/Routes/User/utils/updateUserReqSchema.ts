import * as yup from "yup";
import { Race, ShowName, GenderSpecific } from "Entities/Artist";
import { Residency } from "Entities/Address";
import { Formation } from "Entities/Technical";
import { TechFormation } from "Entities/Area";
import { userContactSchema } from "./userReqSchema"

export const userUpdateTechnicalSchema = yup.object().required().shape({
  formation: yup
    .mixed<Formation>()
    .oneOf(Object.values(Formation)),
  is_drt: yup.boolean(),
  is_ceac: yup.boolean(),
  is_cnpj: yup.boolean(),
  areas: yup
    .array()
    .ensure()
    .of(
      yup.object({
        technical_formation: yup
          .mixed<TechFormation>()
          .oneOf(Object.values(TechFormation)),
        name: yup.string(),
        describe: yup.string(),
        started_year: yup.string(),
        certificate: yup
          .array()
          .ensure()
          .of(
            yup.object({
              name: yup.string(),
            })
          ),
      })
    ),
  idiom: yup
    .array()
    .ensure()
    .of(
      yup.object({
        name: yup.string(),
      })
    ),
})

export const addressSUpdateSchema = yup.object().shape({
  city: yup.string(),
  cep: yup.string(),
  neighbourhood: yup.string(),
  number: yup.number().integer().positive().min(1),
  complement: yup.string(),
  residency: yup
    .mixed<Residency>()
    .oneOf(Object.values(Residency)),
})

export const userUpdateArtistSchema = yup.object().shape({
  name: yup.string(),
  social_name: yup.string(),
  artistic_name: yup.string(),
  show_name: yup.mixed<ShowName>().oneOf(Object.values(ShowName)),
  gender: yup.string(),
  cpf: yup
    .string()
    .matches(/\d{3}\.\d{3}\.\d{3}-\d{2}/),
  birthday: yup.date(),
  rg: yup.string(),
  expedition_department: yup.string(),
  gender_specific: yup.mixed<GenderSpecific>().oneOf(Object.values(GenderSpecific)),
  race: yup.mixed<Race>().oneOf(Object.values(Race)),
  address: addressSUpdateSchema,
  contact: userContactSchema,
  technical: userUpdateTechnicalSchema,
})

export const userUpdateSchema = yup.object({
  password: yup.string().min(6),
  oldpassword: yup.string().min(6),
  artist: userUpdateArtistSchema,
});


export interface UpdateInfo extends yup.Asserts<typeof userUpdateSchema> {}

export interface ArtistUpdateInfo extends yup.Asserts<typeof userUpdateArtistSchema> {}

export default userUpdateSchema;